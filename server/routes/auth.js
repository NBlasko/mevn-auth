const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const authController = require('../controllers/auth');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.authSchema), authController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, authController.signIn);


// auth with google+
router.route('/google')
  .post(passport.authenticate('googleToken', { session: false }), authController.googleOAuth);

// auth with facebook
router.route('/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), authController.facebookOAuth);

router.route('/secret')
  .get(passportJWT, authController.secret);

module.exports = router;