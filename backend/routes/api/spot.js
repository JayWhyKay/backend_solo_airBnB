const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotsImage, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/myspots', requireAuth, async (req, res) => {
    const { id } = req.user
    // console.log(id)
    const listings = await Spot.findAll( {
        where: { ownerId: id }
    });
    res.status(200).json(listings)
});


router.get('/:id', async (req, res) => {
    const listings = await Spot.findByPk(req.params.id, {
        include: [
            { model: SpotsImage },
            { model:User, as: "Owner" }
        ]
    })
    if(!listings){
        return res.json({
            "message": "Spot couldn't be found",
            "statuscode": 404
        });
    }
    return res.status(200).json(listings)
});

router.get('/', async (req, res) => {
    const listings = await Spot.findAll({
        include: [{
            model: SpotsImage,
            attributes: ['image']
        }]
    })
    for(let listing of listings) {
        if(listing.SpotsImage) {
            let previewImg = listing.SpotsImage[0].url
            delete listing.dataValues.SpotsImage
            listing.dataValues['previewImage'] = previewImg
        }
    }
    console.log(listings)
    res.json({listings})
});

router.post('/', requireAuth, async (req, res) => {
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
    console.log(listings)
    res.json({listings})
});

module.exports = router
