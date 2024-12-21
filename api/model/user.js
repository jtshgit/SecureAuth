const mongoose = require('mongoose');
require('dotenv').config();
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, default: '0' },
    password: { type: String, default: process.env.SECRET_RR },
    otp: { type: String, default: process.env.SECRET_RR },
    profilePhoto: { type: String, default: process.env.REACT_APP_ACCOUNT_APP_URL+'/img/userdef.png' },
    confirm: { type: Number, default: 0 }, // Default is 0
    date: { type: Date, default: Date.now } // Default is current date and time
});

module.exports = mongoose.model('user', userSchema);
