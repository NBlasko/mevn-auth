const JWT = require('jsonwebtoken');
const User = require('../models/auth');
const { JWT_SECRET } = require('../configuration');
const bcrypt = require('bcryptjs');

signToken = user => {
  return JWT.sign({
    iss: 'Blasko',  //later www.blasko.com or something similiar
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, name } = req.value.body;

    // Check if there is a user with the entered email
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
      },
      name
    });

    // Generate a salt for passsword
    const salt = await bcrypt.genSalt(10);
    // Hash a password with salt all together
    const passwordHash = await bcrypt.hash(newUser.local.password, salt);
    // Append hashed password to user;
    newUser.local.password = passwordHash;
    //save newUser with hashed password
    await newUser.save();
    // Generate a token and respond with it
    const token = signToken(newUser);
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate a token and respond with it
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    // Generate a token and respond with it
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate a token and respond with it
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log("name",req.user.name)
    res.json({ secret: req.user.name });
  }
}