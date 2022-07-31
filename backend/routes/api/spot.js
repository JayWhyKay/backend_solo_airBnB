const express = require('express')
const { Op } = require('sequelize')

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotsImage, User, Review, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a valid street address.'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a valid city.'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a valid state.'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a valid country.'),
    check('lat')
        .exists()
        .isFloat({ min: -90, max:  90})
        .withMessage('Latitude is not valid.'),
    check('lng')
        .exists()
        .isFloat({min:-180, max:180})
        .withMessage('Longitude is not valid.'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name must be less than 50 characters.')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required.'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required.'),
    handleValidationErrors
];
const validateQuery = [
    check('page')
        .optional()
        .isInt({ min: 0, max: 10 })
        .withMessage('Page must be greater than or equal to 0'),
    check('page')
        .optional()
        .isInt({ min: 0, max: 20 })
        .withMessage('Size must be greater than or equal to 0'),
    check('maxLat')
        .optional()
        .isFloat({ max: 90 })
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional()
        .isFloat({ min: -90 })
        .withMessage('Minimum latitude is invalid'),
    check('minLng')
        .optional()
        .isFloat({ min: -180 })
        .withMessage('Minimum longitude is invalid'),
    check('maxLat')
        .optional()
        .isFloat({ max: 180 })
        .withMessage('Maximum longitude is invalid'),
    check('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be greater than 0'),
    check('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be greater than 0'),
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
        where: { ownerId: user.id },
        include: [{
            model: SpotsImage, as: "previewImage",
            attributes: ['url'],
            limit: 1
        }]
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

router.get('/', validateQuery, async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    const where = {};
    if (minLat) {
        where.lat = {[Op.gte]: minLat}
    };
    if (maxLat) {
        where.lat = {[Op.lte]: maxLat}
    };
    if (minLng) {
        where.lng = {[Op.gte]: minLng}
    };
    if (maxLng) {
        where.lng = {[Op.lte]: maxLng}
    };
    if (minPrice) {
        where.price = {[Op.gte]: parseInt(minPrice)}
    }
    if (maxPrice) {
        where.price = {[Op.lte]: parseInt(maxPrice)}
    }


    page = parseInt(page)
    size = parseInt(size)

    if(size > 20) {
        size = 20
    }
    if(isNaN(page) || page <= 0) {
        page = 1
    }
    if(isNaN(size) || size <= 0 ) {
        size = 20
    }

    const listings = await Spot.findAll({
        where,
        attributes: {exclude: ["numReviews", "avgStarRating"]},
        include: [{
            model: SpotsImage, as: "previewImage",
            attributes: ['url'],
            limit: 1
        }],
        limit: size, offset: size * ( page - 1 )
    })
    res.json({Spots: listings, page, size})
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
