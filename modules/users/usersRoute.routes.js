const express = require('express');
const { registration, login } = require('./controllers/registration'); // Import both functions
const forgotPassword = require('./controllers/forgotPassword');
const restPassword = require('./controllers/resetPassword');

const userRoute = express.Router();

// ROUTES
userRoute.post('/signup', registration); // Corrected the typo here
userRoute.post('/login', login);
userRoute.post('/forgotpassword',forgotPassword)
userRoute.post('/resetpassword',restPassword)

module.exports = userRoute;
