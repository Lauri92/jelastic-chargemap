'use strict';
import express from 'express';
import stationRoute from './routes/stationRoute.js';
import authRoute from './routes/authRoute.js';
import passport from './utils/pass.js';
import db from './utils/db.js';
import http from 'http';
import https from 'https';
import fs from 'fs';

const port = process.env.PORT || 3000;
const httpsPort = process.env.PORT || 8000;

const app = express();

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
  key: sslkey,
  cert: sslcert,
};

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
  https.createServer(options, app).listen(httpsPort);
  http.createServer((req, res) => {
    res.writeHead(301, {'Location': `https://localhost:${httpsPort}` + req.url});
    res.end();
  }).listen(port).on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });
});

