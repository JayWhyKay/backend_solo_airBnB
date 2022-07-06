const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotsImage, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Street address is required.'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Country is required.'),
    check('lat')
        .exists()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists()
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];
const validateListing = async (req, res, next) => {
    const exists = await Spot.findOne({
        where: {
            id: req.params.id
        }
    });
    if(exists) return next()

    const err = new Error("Spot could not be found");
    // err.error = { "message": "Spot couldn't be found", "statuscode": 404 } ;
    err.status = 404;
    return next(err);
}

router.get('/myspots', requireAuth, async (req, res) => {
    const { user } = req
    const Spots = await Spot.findAll( {
        where: { ownerId: user.id }
    });
    res.json({ Spots })
});


router.get('/:id', validateListing, async (req, res) => {
    const listings = await Spot.findByPk(req.params.id, {
        include: [
            { model:SpotsImage },
            { model:User, as: "Owner" }
        ]
    })
    res.json(listings)
});

router.get('/', async (req, res) => {
    const listings = await Spot.findAll({
        include: [{
            model: SpotsImage,
            attributes: ['url']
        }]
    })
    for(let listing of listings) {
        if(listing.SpotsImage) {
            let previewImg = listing.SpotsImage[0].url
            console.log(previewImg)
            delete listing.dataValues.SpotsImage
            listing.dataValues['previewImage'] = previewImg
        }
    }
    console.log(listings)
    res.json({listings})
});

router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price }
        = req.body;

    const listings = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    res.json(listings)
});

router.patch('/:id', requireAuth, validateListing, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price }
        = req.body;
    const listing = await Spot.findByPk(req.params.id)
    await listing.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    res.json(listing)
});

router.delete("/:id", requireAuth, validateListing, async(req, res) => {
    const listing = await Spot.findByPk(req.params.id)
    await listing.destroy()
    res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
});



module.exports = router
