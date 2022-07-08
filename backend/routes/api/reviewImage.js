const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, SpotsImage, Review, ReviewImage } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// const { up } = require('../../db/seeders/20220707145227-booking');

const router = express.Router();

const validateAuthorization = async (req, res, next) => {
    const exists = await Review.findByPk(req.params.reviewId)
    console.log(exists)

    if(exists.userId == req.user.id) return next()


    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
};

const validateImageOwner = async (req, res, next) => {
    const revImg = await ReviewImage.findByPk(req.params.id)
    const review = await Review.findByPk(revImg.reviewId)
    console.log(revImg)

    if(review.userId == req.user.id) return next()

    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
};

const validateImage = async (req, res, next) => {
    const exists = await ReviewImage.findByPk(req.params.id);

    if(exists) return next()

    const err = new Error("Image couldn't be found");
    err.status = 404;
    return next(err);
};

const validateLimit = async (req, res, next) => {
    const exists = await ReviewImage.findAll({where:{reviewId: req.params.reviewId}});
    console.log('asdfasdf', exists.length)
    if(exists.length < 10) return next()

    const err = new Error("Maximum number of images for this resource was reached");
    err.status = 400;
    return next(err);
};

router.post("/add/:reviewId", requireAuth, validateAuthorization, validateLimit,
    async(req, res) => {
        const { reviewId } = req.params
        const newImg = await ReviewImage.create({
            reviewId,
            url: req.body.url
        });
        res.json({
            id: newImg.id,
            imageableId: newImg.reviewId,
            imageableType: "Review",
            url: newImg.url
        })
});

router.delete('/:id', requireAuth, validateImage, validateImageOwner,  async (req,res) => {
    const revImg = await ReviewImage.findByPk(req.params.id)
    await revImg.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});

module.exports = router
