'use strict';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import stationRoute from './routes/stationRoute.js';
import authRoute from './routes/authRoute.js';
import passport from './utils/pass.js';
import db from './utils/db.js';
import bcrypt from 'bcrypt';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize({}));

app.use('/station', stationRoute); // passport.authenticate('jwt', {session: false})
app.use('/auth', authRoute);

app.get('/', async (req, res) => {
  if (req.secure) {
    const saltRound = 12;
    const pwd1234 = await bcrypt.hash('1234', saltRound);
    console.log('1234 possible hash: ', pwd1234);
    const pwdQwert = await bcrypt.hash('qwer', saltRound);
    console.log('qwer possible hash: ', pwdQwert);
    res.send('Hello secure chargemap');
  } else {
    res.send('Not secure chargemap');
  }
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
db.on('connected', () => {
  if (process.env.NODE_ENV === 'production') {
    (async () => (await import('./utils/production.js')).default(app, port))();
  } else {
    (async () => (await import('./utils/localhost.js')).default(app, port))();
  }
}).on('error', (err) => {
  console.log(`Connection error: ${err.message}`);
});
