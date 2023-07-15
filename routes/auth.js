const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser,
        loginUser,
        renewToken } = require('../controllers/auth');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


// Routes

/* 
    host + /api/auth
*/ 


router.post( 
    '/register', 
    [ 
    // check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email debe ser válido.').isEmail(),
    check('password') 
        .isLength({ min: 8 }).withMessage('Password debe tener al menos 8 caracteres.')
        .isAlphanumeric().withMessage('Password debe contener letras y números.'),

    validateFields    
    ],       
    createUser );

router.post( 
    '/', 
    [ 
    check('email', 'Email debe ser válido.').isEmail(),
    check('password', 'Password debe tener al menos 8 caracteres.').isLength({ min: 8 }),

    validateFields
    ],
    loginUser );

router.get( '/renew', validateJWT, renewToken );




module.exports = router;