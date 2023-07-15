const { Router } = require('express');
const router = Router();

const { getProfile,
        updateProfile } = require('../controllers/profile');

const { validateJWT } = require('../middlewares/validate-jwt');




router.get( '/', validateJWT, getProfile );

router.put( '/:userId', validateJWT, updateProfile );


module.exports = router;