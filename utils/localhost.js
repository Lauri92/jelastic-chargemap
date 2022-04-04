'use strict';
import dotenv from 'dotenv';
import http from 'http';
import https from 'https';
import fs from 'fs';

const httpsPort = process.env.PORT || 8000;
const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
  key: sslkey,
  cert: sslcert,
};

export default (app, port) => {
  https.createServer(options).listen(httpsPort);

  http.createServer((req, res) => {
    res.writeHead(301,
        {'Location': `https://localhost:${httpsPort}` + req.url});
    res.end();
  }).listen(port);
}