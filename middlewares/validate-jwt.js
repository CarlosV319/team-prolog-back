const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next ) => {

const token = req.header('x-token');

    if( !token ) {
        return res.status( 401 ).json({
            ok: false,
            msg: 'Invalid token'
        });
    }


    try { // Verify token
    
    const payload = jwt.verify(
        // two args
        token,                     // 1- Token
        process.env.SECRET_JWT_SEED// 2- secret/publicKey
    );

    req.uid = payload.uid;
    req.name = payload.name;

    } catch (error) {
        return res.status( 401 ).json({
            ok: false,
            msg: 'Invalid token',
        });
    };

next();
};

module.exports = {
    validateJWT
}