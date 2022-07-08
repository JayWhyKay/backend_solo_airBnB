const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotsImage, User, Review, sequelize } = require('../../db/models');
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
        .isFloat({ min: -90, max:  90})
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists()
        .isFloat({min:-180, max:180})
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name must be less than 50 characters')
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
    const exists = await Spot.findByPk(req.params.id);
    if(exists) return next()

    const err = new Error("Spot could not be found");
    err.status = 404;
    return next(err);
}
const validateAuthorization = async (req, res, next) => {
    const exists = await Spot.findByPk(req.params.id)

    if(exists.ownerId == req.user.id) return next()

    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
};

router.get('/myspots', requireAuth, async (req, res) => {
    const { user } = req
    const spots = await Spot.findAll( {
        where: { ownerId: user.id }
    });
    res.json({ Spots: spots })
});


router.get('/:id', validateListing, async (req, res) => {

    // const listing = await Spot.findByPk(req.params.id,
    //     {include: [
    //         { model: SpotsImage, as: "images", attributes: ["url"] },
    //         { model: User, as: "Owner" }
    //     ]
    // })
    // const average = await Spot.findByPk(req.params.id, {
    //     include: {
    //         model: Review,
    //         attributes: []
    //     },
    //     attributes: [
    //         [sequelize.fn("COUNT", sequelize.col("*")), 'numReviews'],
    //         [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
    //     ]
    // })
    const listing = await Spot.findByPk(req.params.id);
    const numReviews = await Review.count({where: {spotId: req.params.id}})
    const rating = await Review.findAll({
        where: { spotId: req.params.id },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
        ]
    });
    const images = await SpotsImage.findAll({
        where: { spotId: req.params.id },
        attributes:["url"]
    });
    const Owner = await User.findByPk(listing.ownerId, {
        attributes:["id", "firstName", "lastName"]
    });
    console.log(rating)
    listing.numReviews = numReviews
    listing.avgStarRating = rating

    const result = {
        id: listing.id,
        ownerId: listing.ownerId,
        address: listing.address,
        city: listing.city,
        state: listing.state,
        country: listing.country,
        lat: listing.lat,
        lng: listing.lng,
        name: listing.name,
        description: listing.description,
        price: listing.price,
        createdAt: listing.createdAt,
        updatedAt: listing.updatedAt,
        numReviews: numReviews,
        avgStarRating: rating,
        images: images,
        Owner: Owner
    }

    res.json(result)
});

router.get('/', async (req, res) => {
    const listings = await Spot.findAll({
        attributes: {exclude: ["numReviews", "avgStarRating"]},
        include: [{
            model: SpotsImage, as: "previewImage",
            attributes: ['url'],
            limit: 1
        }]
    })
    res.json({Spots: listings})
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
    res.statusCode = 201
    res.json(listings)
});

router.patch('/:id', requireAuth, validateListing, validateSpot, validateAuthorization, async (req, res) => {
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

router.delete("/:id", requireAuth, validateListing, validateAuthorization, async(req, res) => {
    const listing = await Spot.findByPk(req.params.id)

    await listing.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
});



module.exports = router
