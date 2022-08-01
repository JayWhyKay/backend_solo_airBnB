const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./zzzusers');
const spotsRouter = require('./spots');
const reviewsRouter = require('./reviews');
const bookingsRouter = require('./bookings');
const spotImageRouter = require('./spotImage.js');
const reviewImageRouter = require('./reviewImage.js');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/login', sessionRouter);
router.use('/users', usersRouter);
router.use('/listings', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/images/listings', spotImageRouter);
router.use('/images/reviews', reviewImageRouter);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

// GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// });

// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// });

module.exports = router;
