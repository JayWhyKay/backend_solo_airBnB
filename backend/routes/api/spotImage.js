const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, SpotsImage } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// const { up } = require('../../db/seeders/20220707145227-booking');

const router = express.Router();

const validateAuthorization = async (req, res, next) => {
    const exists = await Spot.findByPk(req.params.spotId)
    if(exists.ownerId == req.user.id) return next()

    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
};

const validateListing = async (req, res, next) => {
    const exists = await Spot.findByPk(req.params.spotId)
    if(exists) return next()

    const err = new Error("Spot could not be found");
    err.status = 404;
    return next(err);
};

const validateImage = async (req, res, next) => {
    const exists = await SpotsImage.findByPk(req.params.id);

    if(exists) return next()

    const err = new Error("Image couldn't be found");
    err.status = 404;
    return next(err);
};

const validateImageOwner = async (req, res, next) => {
    const spotImg = await SpotsImage.findByPk(req.params.id)
    const spot = await Spot.findByPk(spotImg.spotId)
    console.log(spot)

    if(spot.ownerId == req.user.id) return next()

    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
};

router.post('/add/:spotId', requireAuth, validateListing, validateAuthorization,  async(req, res) => {
    const { spotId } = req.params
    const newImg = await SpotsImage.create({
        spotId,
        url: req.body.url
    });
    res.json({
        id: newImg.id,
        imageableId: newImg.spotId,
        imageableType: "Spot",
        url: newImg.url
    })
});

router.delete('/:id', requireAuth, validateImage, validateImageOwner, async (req,res) => {
    const spotImg = await SpotsImage.findByPk(req.params.id)
    await spotImg.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
})

module.exports = router;
