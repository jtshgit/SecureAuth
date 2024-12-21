// app.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const loginController = require('./controllers/registration/login');
const signinController = require('./controllers/registration/signin');
const resetPassController = require('./controllers/registration/resetPass');
const corsMiddleware = require('./middlewares/corsMiddleware');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const passport = require('./config/passportConfig');
const proxyImage = require('./controllers/proxy');
const googleAuth = require('./controllers/registration/googleAuth');


// Initialize the app
const app = express();
dotenv.config();

// Set up middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(sessionMiddleware);

// Initialize Passport.js session support
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Google Callback Route
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuth.authCallback);
app.get('/auth/success', googleAuth.authSuccess);
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));
//google auth routes

// Example protected route that requires authentication via JWT
app.get('/protected', loginController.protected);

// Registration and Login routes (use your existing logic)
app.post('/register', signinController.register);
app.post('/otpcheck', signinController.otpCheck);
app.post('/login', loginController.login);
app.post('/logout', loginController.logout);

// Reset Password routes (use your existing logic)
app.post('/resetpass', resetPassController.resetPass);
app.post('/resotpcheck', resetPassController.resetOtpCheck);
app.post('/resetconfirm', resetPassController.resetConfirm);

//proxy and other routes
app.get('/proxy-image', proxyImage.proxyImage);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
