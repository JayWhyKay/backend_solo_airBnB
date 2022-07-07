const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateListing = async (req, res, next) => {
    const exists = await Review.findByPk(req.params.reviewId);

    if(exists) return next()

    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
};
const validateDuplicate = async (req, res, next) => {
    const exists = await Review.findAll({
        where: {
            userId: req.user.id
        }
    });
    if(!exists) return next()

    const err = new Error("User already has a review for this spot");
    err.status = 403;
    return next(err);
};

const validateAuthorization = async (req, res, next) => {
    const exists = await Review.findByPk(req.params.reviewId)

    if(exists.userId == req.user.id) return next()


    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
};

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Review text is required'),
    check("stars")
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];


router.get("/myreviews", requireAuth, async(req,res) => {
    const Reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { model: Spot.scope('review') },
            { model: ReviewImage, as: "images" , attributes: ["url"] }
        ]
    })
    res.json({Reviews})
});

router.get("/listings/:spotId", validateListing, async(req,res) => {
    const spotId = req.params
    const Reviews = await Review.findAll({
        where: spotId,
        include: [
            { model: User.scope('defaultScope') },
            { model: ReviewImage, as: "images" , attributes: ["url"] }
        ]
    });
    res.json({Reviews});
});

router.post("/listings/:spotId", requireAuth, validateDuplicate, validateReview, async(req,res) => {

    const spot = await Spot.findOne({where: {id: req.params.spotId}})

    const { review, stars } = req.body
    const newReview = await Review.create({
        userId: req.user.id,
        spotId: spot.id,
        review,
        stars
    });
    res.json(newReview);
});

router.patch("/:reviewId", requireAuth, validateAuthorization, validateReview, validateListing, async(req,res) => {
    const { review, stars } = req.body
    console.log(req.params)
    const reviewUpdate = await Review.findByPk(req.params.reviewId)
    await reviewUpdate.update({
        review,
        stars
    });
    res.json(reviewUpdate);
});

router.delete("/:reviewId", requireAuth, validateAuthorization, validateListing, async (req,res) => {
    const review = await Review.findByPk(req.params.reviewId);
    await review.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});

module.exports = router;
