const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./../model/user');

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.REACT_APP_API_URL + '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await User.findOne({ email: profile.emails[0].value });
            if (existingUser) {
                existingUser.googleId = profile.id;
                existingUser.name = profile.displayName;
                existingUser.profilePhoto = profile.photos[0]?.value;
                await existingUser.save();
                return done(null, existingUser);
            }

            const newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                profilePhoto: profile.photos[0]?.value,
                confirm: 1
            });

            await newUser.save();
            done(null, newUser);
        } catch (err) {
            done(err, null);
        }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
