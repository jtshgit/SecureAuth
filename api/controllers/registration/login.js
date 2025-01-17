const User = require('../../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email.toLowerCase(), confirm: 1});
        if (!user) return res.status(400).json({ success: false, error: 'Invalid username or password' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid username or password' });
        const token = jwt.sign({ id: user._id.toString(), name: user.name, email: user.email, pp: user.profilePhoto }, process.env.JWT_SECRET, { expiresIn: 60 * 24 * 60 * 60 });
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Set true for HTTPS in production
            sameSite: 'Lax', 
            domain: process.env.COOKIE_DOMAIN, 
            maxAge: 60 * 24 * 60 * 60 * 1000 // 2 months in milliseconds
        });
        res.json({ success: true, message: 'Login successful'});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax', 
        domain: process.env.COOKIE_DOMAIN
    });
    res.json({ success: true, message: 'Logged out' });
}

exports.protected =  (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ success: false, error: 'Unauthorized', auth: false });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ success: true, message: 'Protected content', user: verified });
    } catch (error) {
        res.json({ success: false, error: 'Unauthorized', auth: false });
    }
};