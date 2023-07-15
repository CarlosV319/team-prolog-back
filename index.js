const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();


const app = express();

dbConnection();

// CORS
app.use( cors() );

app.use( express.static('public') );

app.use( express.json() );



app.use( '/api/auth', require('./routes/auth') );

app.use( '/api/profile', require('./routes/profile') );



app.listen( process.env.PORT || 4000, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});