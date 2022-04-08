'use strict';
import passport from 'passport';
import {Strategy} from 'passport-local';
import passportJWT from 'passport-jwt';
import bcrypt from 'bcrypt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import {getUserLogin} from '../models/userModel.js';


// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      try {
        const user = await getUserLogin(username);
        console.log('Local strategy', user);
        if (user === undefined || user === false) {
          // consider artificial slowness to simulate slow password check (and anyway slowdown brute force attack)
          // setTimeout(() => { /*done*/ },  Math.floor(Math.random() * 1000));
          return done(null, false, {message: 'Wrong user.'});
        }
        if (!await bcrypt.compare(password, user.password)) {
          console.log("got into comapre");
          return done(null, false, {message: 'Wrong PW.'});
        }
        delete user.password; // make sure that the password do not travel around...
        console.log("got after deletion");
        return done(null, user, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
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
