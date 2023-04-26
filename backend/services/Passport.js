var GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../models/User");
module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
      done(err, user);
    });
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        try {
          const user = await UserModel.findOne({
            email: profile.emails[0].value,
          });
          if (user) {
            const updatedUser = {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: accessToken,
            };
            const result = await UserModel.findOneAndUpdate(
              { _id: user.id },
              { $set: updatedUser },
              { new: true }
            );
            return cb(null, result);
          } else {
            const newUser = new UserModel({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              password: accessToken,
            });
            const result = await newUser.save();
            return cb(null, result);
          }
        } catch (err) {
          console.log(err);
          return cb(err, null);
        }
      }
    )
  );
};
