const jwt = require('jsonwebtoken');

exports.authSuccess = (req, res) => {
    res.send(`
      <script>
        window.opener.postMessage('success', window.location.origin);
        window.close();
      </script>
    `);
};

exports.authCallback = async (req, res) => {
    try {
        const user = req.user;

        // JWT Authentication
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email, pp: user.profilePhoto },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 24 * 60 * 60 } // 2 months in seconds
        );

        // Set JWT token in cookies
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Set true for HTTPS in production
            sameSite: 'Lax', 
            domain: process.env.COOKIE_DOMAIN, 
            maxAge: 60 * 24 * 60 * 60 * 1000 // 2 months in milliseconds
        });

        // Respond with success
        res.redirect('/auth/success');
    } catch (err) {
        console.error('Error during Google callback:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error'+err });
    }
};