const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
        httpOnly: true,
        sameSite: 'None', // Required for cross-origin cookies
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
});
