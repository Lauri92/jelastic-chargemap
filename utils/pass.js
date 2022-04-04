'use strict';
import passport from 'passport';
import {Strategy} from 'passport-local';
import passportJWT from 'passport-jwt';
import bcrypt from 'bcrypt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import {getUserLogin} from '../models/userModel.js';

/*
// serialize: store user id in session
passport.serializeUser((user, done) => {
  console.log('serialize', user);
  // serialize user id by adding it to 'done()' callback
  done(null, user);
});

// deserialize: get user from session and get all user data
passport.deserializeUser(async (user, done) => {
  console.log('deserialize', user);
  // deserialize user by adding it to 'done()' callback
  done(null, user);
});

passport.use(new Strategy(
    (username, password, done) => {
      // get user by username (in this case email) from userModel/getUserLogin
      const user = getUserLogin(username);
      console.log(user);
      // if user is undefined
      if (!user) {
        return done(null, false);
      }
      // if passwords dont match
      if (password !== user.password) {
        return done(null, false);
      }
      // if all is ok
      delete user.password;
      return done(null, user);
    },
));
*/

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      try {
        const user = getUserLogin(username);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          // consider artificial slowness to simulate slow password check (and anyway slowdown brute force attack)
          // setTimeout(() => { /*done*/ },  Math.floor(Math.random() * 1000));
          return done(null, false, {message: 'Wrong credentials.'});
        }
        if (!await bcrypt.compare(password, user.password)) {
          return done(null, false, {message: 'Wrong credentials.'});
        }
        delete user.password; // make sure that the password do not travel around...
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET

passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'abc',
    },
    async (jwtPayLoad, done) => {
      try {
        if (jwtPayLoad === undefined) {
          return done(null, false, {message: 'Incorrect id.'});
        }
        // jwt matches
        return done(null, {...jwtPayLoad}, {message: 'Logged in succesfully'});
      } catch (err) {
        return done(err);
      }
    },
));

export default passport;
