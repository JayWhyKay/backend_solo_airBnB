// const express = require('express')

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const router = express.Router();

// const validateSignup = [
//     check('firstName')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 1 })
//         .withMessage('Please provide a first name with at least 1 characters.'),
//     check('firstName')
//         .not()
//         .isEmail()
//         .withMessage('First name cannot be an email.'),
//     check('lastName')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 1 })
//         .withMessage('Please provide a last name with at least 1 characters.'),
//     check('lastName')
//         .not()
//         .isEmail()
//         .withMessage('Last name cannot be an email.'),
//     check('email')
//         .exists({ checkFalsy: true })
//         .isEmail()
//         .withMessage('Please provide a valid email.'),
//     check('password')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 6 })
//         .withMessage('Password must be 6 characters or more.'),
//     handleValidationErrors
// ];

// Sign up
// router.post( '/', validateSignup, async (req, res) => {
//     const { firstName, lastName, email, password} = req.body;

//     const user = await User.signup({ firstName, lastName, email, password });

//     await setTokenCookie(res, user);
//     return res.json({user});
// });


// module.exports = router;
