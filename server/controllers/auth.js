const JWT = require('jsonwebtoken');
const User = require('../models/auth');
const { JWT_SECRET } = require('../secret');
const bcrypt = require('bcryptjs');
signToken = user => {
  return JWT.sign({
    iss: 'Blasko',  //later www.blasko.com or something similiar
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}


module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    // Create a new user
    const newUser = new User({
      method: 'local',
      local: {
        email: email,
        password: password
      }
    });

    // console.log('entered');
    //  if (newUser.method !== 'local') next();

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(newUser.local.password, salt);
    // Re-assign hashed version over original, plain text password
    newUser.local.password = passwordHash;
    //console.log('exited');

    //save newUser with hashed password
    await newUser.save();

    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {

    res.json({ secret: "Bravo! this is the secret" });
  }
}