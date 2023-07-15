const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getProfile = async( req, res ) => {
  
  const id = req.uid;


    try {

        const user = await User.findById( id );
    
        if( !user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        
        res.status( 201 ).json({
            ok: true,
            uid: user.id,
            avatar: user.avatar,
            name: user.name,
            bio: user.bio,
            email: user.email,
            // password: user.password,
            phoneNumber: user.phoneNumber,
            google: user.google,
        });
        
    } catch ( error ) {
        
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor contacte al administrador'
        });
    };
}

const updateProfile = async( req, res ) => {

    const userId = req.params.userId;
    const uid = req.uid;

    try {

        const user = await User.findById( userId );

        if( !user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        if( userId !== uid ) {
            return res.status( 401 ).json({
                ok: false,
                msg: 'No tiene privilegio de editar este perfil'
            });
        }

        let newProfile = {
        ...req.body,
        };


        if ( (newProfile.password !== "") && (newProfile.password !== undefined) ) {

            const salt = bcrypt.genSaltSync();

            newProfile.password = bcrypt.hashSync( newProfile.password, salt );

            await User.findByIdAndUpdate( 
                            userId, 
                            newProfile, 
                            { new: true } 
                        );

        }
            await  User.findByIdAndUpdate( 
                userId, 
                newProfile = {
                avatar: req.body.avatar,
                name: req.body.name,
                bio: req.body.bio,
                // password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                google: user.google
            }, 
            { new: true } 
        );

        res.status( 201 ).json({
            ok: true,
            // profile: updatedProfile
        });
        
    } catch ( error ) {
        
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor contacte al administrador'
        });
    };
}


module.exports = {
    getProfile,
    updateProfile
}