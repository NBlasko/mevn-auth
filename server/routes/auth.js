
const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const authController = require('../controllers/auth');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  // sign up with email
  .post(
    validateBody(schemas.signUpSchema),
    authController.signUp
  );

router.route('/signin')
  // signin with email
  .post(
    validateBody(schemas.signInSchema),
    passportSignIn,
    authController.signIn
  );

router.route('/google')
  //signin with google auth
  .post(
    passport.authenticate('googleToken', { session: false }),
    authController.googleOAuth
  );

router.route('/facebook')
  //signin with facebook auth
  .post(
    passport.authenticate('facebookToken', { session: false }),
    authController.facebookOAuth
  );

router.route('/secret')
  .get(
    passportJWT,
    authController.secret
  );

module.exports = router;