const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const config = require('./configuration');
const User = require('./models/auth');
const bcrypt = require('bcryptjs');


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
  try {

    // Find the user by data extracted from token
    const user = await User.findById(payload.sub);

    // If user doesn't exists, null means no error, false means no user
    if (!user) return done(null, false);

    // null means no error, and pass the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));



// Google Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: config.oauth.google.clientID,
  clientSecret: config.oauth.google.clientSecret,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Should have full user profile over here
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    // Find the user by data extracted from token
    const existingUser = await User.findOne({ "google.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value
      },
      name: profile.displayName
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
}));

//Facebook Strategy
passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: config.oauth.facebook.clientID,
  clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    const existingUser = await User.findOne({ "facebook.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      },
      name: profile.displayName
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
}));

// Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await User.findOne({ "local.email": email });

    // If user doesn't exist, null means no error , false means no user
    if (!user) return done(null, false);

    // Compare entered password with the one in the database
    const passwordInDB = user.local.password;
    const isMatch = await bcrypt.compare(password, passwordInDB);
    if (!isMatch) {
      // null means no error , false means no user
      return done(null, false);
    }
    // null means no error , user means no user
    done(null, user);
  } catch (error) {
    //error means error , false means no user
    done(error, false);
  }
}));