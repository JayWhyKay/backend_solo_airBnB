const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateListing = async (req, res, next) => {
    const exists = await Spot.findOne({
        where: {
            id: req.params.id
        }
    });
    if(exists) return next()

    const err = new Error("Spot could not be found");
    err.status = 404;
    return next(err);
}

router.get("/reviews", requireAuth, async(req,res) => {
    const Reviews = await Review.findAll({where:{userId: req.user.id}})
    console.log(Reviews)
})



module.exports = router;
