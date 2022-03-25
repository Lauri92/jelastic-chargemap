'use strict';
import {Router} from 'express';
import {login} from '../controllers/authController.js';
import passport from '../utils/pass.js';

const router = Router();
/*
router.post('/login',
    passport.authenticate('local', {failureRedirect: 'https://google.fi'}),
    (req, res) => {
      console.log('success');
      res.status(200).json({message: 'Logged in'})
    });
*/
router.post('/login', login);

export default router;
