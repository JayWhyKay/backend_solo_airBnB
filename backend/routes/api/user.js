const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// const validateLogin = [  //checks to see whether or not req.body.credential and req.body.password
//     check('credential')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage('Email is required'),
//     check('password')
//         .exists({ checkFalsy: true })
//         .withMessage('Password is required'),
//     handleValidationErrors
// ];

const validateEmail = async (req, res, next) => {
    const { email } = req.body
    const exists = await User.findOne({
        where: {
            email: email
        }
    });
    if(!exists) return next()

    const err = new Error("User already exists");
    err.errors = {"email": "User with that email already exists" } ;
    err.status = 403;
    return next(err);
}


const validSignupParams = [
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('First Name is required'),
    check('firstName')
        .not()
        .isEmail()
        .withMessage('First name cannot be an email'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Last Name is required'),
    check('lastName')
        .not()
        .isEmail()
        .withMessage('Last name cannot be an email'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

router.post( '/sign-up', validateEmail, validSignupParams, async (req, res) => {
    const { firstName, lastName, email, password} = req.body;
    console.log("!!!!!!!!!!!!!!!!!!" + req.body)

    const user = await User.signup({ firstName, lastName, email, password });

    const token = await setTokenCookie(res, user);

    currentUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token
    }

    return res.json(currentUser);
});

// Log in
// router.post( '/', validateLogin, async (req, res, next) => {
//     const { credential, password } = req.body;

//     const user = await User.login({ credential, password });

//     if (!user) {
//         const err = new Error('Login failed');
//         err.status = 401;
//         err.title = 'Login failed';
//         err.errors = ['Invalid credentials'];
//         return next(err);
//     };

//     const token = await setTokenCookie(res, user);
//     currentUser = {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         token
//     }

//     return res.json( currentUser );
// });

// Log out
// router.delete( '/', (_req, res) => {
//     res.clearCookie('token');
//     return res.json({ message: 'success' });
// });

// // Restore session user
// router.get( '/', restoreUser, async (req, res) => {
//     const { user } = req;
//     if (user) {
//         const token = await setTokenCookie(res, user);
//         currentUser = {
//             id: user.id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             token
//         }
//         return res.json(
//             currentUser
//         );
//     } else return res.json(null);
// });


module.exports = router;
