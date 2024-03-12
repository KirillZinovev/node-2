const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");
const logger = require("../logger");
require("dotenv").config();
const appToken = process.env.APP_TOKEN;

function passportFunctionGoogle(passport) {
  passport.serializeUser(function (user, done) {
    const newUser = {};
    (newUser.id = user.id),
      (newUser.email = user.emails[0].value),
      (newUser.name = user.displayName),
      (newUser.age = user.birthday ? date.now() - user.birthday : 0),
      done(null, newUser);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      function (request, accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          // To keep the example simple, the user's Google profile is returned
          // to represent the logged-in user.  In a typical application, you would
          // want to associate the Google account with a user record in your
          // database, and return that user instead.
          logger.info(
            "Получили профиль от Google" +
              profile.name.familyName +
              profile.name.givenName
          );
          return done(null, profile);
        });
      }
    )
  );
}

module.exports = passportFunctionGoogle;
