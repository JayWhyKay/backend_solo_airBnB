const express = require('express')
const { Op } = require('sequelize')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, SpotsImage } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// const { up } = require('../../db/seeders/20220707145227-booking');

const router = express.Router();

const validateListing = async (req, res, next) => {
    const exists = await Spot.findByPk(req.params.spotId);

    if(exists) return next()

    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
};

const validateSpot = async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    const exists = await Spot.findByPk(booking.spotId);

    if(exists) return next()

    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
};

const validateBooking = async (req, res, next) => {
    const exists = await Booking.findByPk(req.params.bookingId);

    if(exists) return next()

    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
};

// const validateDuplicate = async (req, res, next) => {
//     const reservations = await Booking.findAll({
//         where: {
//             [Op.or]: [
//                 { startDate: {[Op.between]: [req.body.startDate, req.body.endDate]}},
//                 { endDate: {[Op.between]: [req.body.startDate, req.body.endDate]}}
//             ]
//         }
//     });

//     const exist = reservations.filter(reso => {
//         if((reso.spotId == parseInt(req.params.spotId))) return reso
//     })
//     if(!exist) return next()

//     const err = new Error("Sorry, this spot is already booked for the specified dates");
//     err.status = 403;
//     err.errors = {
//         "startDate": "Start date conflicts with an existing booking",
//         "endDate": "End date conflicts with an existing booking"
//     }
//     return next(err);
// };

const validResDate = async (req, _res, next) => {
    const { startDate, endDate } = req.body;

    const allBookings = await Booking.findAll({
        where: { spotId: req.params.spotId }
    });

    const err = new Error("Sorry, this spot is already booked for the specified dates");
    err.status = 403;
    err.errors = {};

    for(let booking of allBookings) {
        if ((booking.startDate < endDate && booking.endDate > startDate) ||
        (booking.startDate == startDate || booking.endDate == endDate)) {
            err.errors = {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            };
            next(err);
        }
    }
    next();
};

const validateOwner = async (req, res, next) => {
    const exists = await Spot.findByPk(req.params.spotId)

    if(exists && (exists.ownerId !== req.user.id)) return next()


    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
};
const validateAuthorization = async (req, res, next) => {
    const exists = await Booking.findByPk(req.params.bookingId)

    if(exists && (exists.userId == req.user.id)) return next()


    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
};

const validateParams = async (req, res, next) => {
    const exists = await Booking.findByPk(req.params.bookingId)

    const end = parseInt(exists.endDate.split('-').join(''))
    const reqStart = parseInt(req.body.startDate.split('-').join(''))
    let date = new Date().toISOString().slice(0, 10)
    let today = parseInt(date.split("-").join(""))

    if(today < end) {
        if(reqStart < today){
            const err = new Error("Please provide a valid date");
            err.status = 400;
            return next(err);
        }
        return next()
    }


    const err = new Error("Past bookings can't be modified");
    err.status = 400;
    return next(err);
};

const validateStart = async (req, res, next) => {
    const exists = await Booking.findByPk(req.params.bookingId)

    const start = parseInt(exists.startDate.split('-').join(''))
    let date = new Date().toISOString().slice(0, 10)
    let today = parseInt(date.split("-").join(""))


    if(today < start) return next()


    const err = new Error("Bookings that have been started can't be deleted");
    err.status = 400;
    return next(err);
};


router.get("/mybookings", requireAuth, async(req, res) => {
    const Bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [{
            model: Spot, attributes: {
                exclude:['createdAt', 'updatedAt', 'numReviews', 'avgStarRating', 'description']
            },
            include:
                { model:SpotsImage, as: "images", attributes: ["url"], limit: 1 }
        }]
    })
    res.json({Bookings})
});

router.get("/listings/:spotId", requireAuth, validateListing, async(req, res) => {
    const requestUser = req.user.id;
    const spot = await Spot.findByPk(req.params.spotId)

    if(spot.ownerId == req.user.id){
        const Bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: [{model: User.scope('defaultScope'), as: "User"}]
        })
        res.json({Bookings})
    }

    const Bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes:["spotId", "startDate", "endDate"]
    })
    res.json({Bookings})
});

router.post('/listings/:spotId', requireAuth, validateOwner,
    validResDate, async (req,res) => {
        const { startDate, endDate } = req.body
        const newBooking = await Booking.create({
            spotId: req.params.spotId,
            userId: req.user.id,
            startDate,
            endDate
        });
        res.json(newBooking);
});

router.patch('/mybookings/:bookingId', requireAuth, validateBooking,
validateAuthorization, validateParams,
    async (req, res) => {
        const { startDate, endDate } = req.body
        const updateBooking = await Booking.findByPk(req.params.bookingId)
        await updateBooking.update({
            startDate,
            endDate
        });
        res.json(updateBooking);
});

router.delete('/mybookings/:bookingId', requireAuth, validateBooking, validateAuthorization, validateStart,
    async (req, res) => {
        const deleteRes = await Booking.findByPk(req.params.bookingId)
        deleted = await deleteRes.destroy()

        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
);






module.exports = router
