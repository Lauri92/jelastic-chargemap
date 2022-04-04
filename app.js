'use strict';
import express from 'express';
import stationRoute from './routes/stationRoute.js';
import authRoute from './routes/authRoute.js';
import passport from './utils/pass.js';
import db from './utils/db.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize({}));

app.use('/station', stationRoute); // passport.authenticate('jwt', {session: false})
app.use('/auth', authRoute);

app.get('/', (req, res) => {
  if (req.secure) {
    res.send('Hello secure chargemap');
  } else {
    res.send('Not secure chargemap');
  }
});

db.on('connected', () => {
  (async () => (await import('./utils/localhost.js')).default(app, port))();
}).on('error', (err) => {
  console.log(`Connection error: ${err.message}`);
});
