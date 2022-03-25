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

db.on('connected', () => {
  app.listen(port, () => {
    console.log(`app listen on port ${port}`);
  }).on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });
});

