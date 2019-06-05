module.exports = {
  JWT_SECRET: process.env.JWT_STRATEGY_SECRET,
  oauth: {
    google: {
      clientID: process.env.OUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.OUTH_GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientID: process.env.OUTH_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.OUTH_FACEBOOK_CLIENT_SECRET,
    },
  },
}