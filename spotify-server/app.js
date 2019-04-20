const express = require('express');
const cors = require('cors')
const request = require('request');

const app = express();

const _CLIENT_ID = '2a94473510424f24996ac27e0f4b40d7';
const _SECRET_ID = '723a98b89ed24c35b74483504fb574d7';


var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(_CLIENT_ID + ':' + _SECRET_ID).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

app.use((req, res, next) => {
    res.removeHeader('X-Powered-By'); // usuniecie nagłówka
    next();
})

app.use('/album', cors(),(req, res, next) => {
    res.setHeader('Content-Type', 'application/json'); // ustawienie ze to json
    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          var token = body.access_token;
          var options = {
            url: `https://api.spotify.com/v1/search?q=${req.query.q}&type=album`,
            headers: {
              'Authorization': 'Bearer ' + token
            },
            json: true
          };
          request.get(options, (error, response, body) => {
            res.end(JSON.stringify(body));
          });
        }
      });
})

app.use('/tracks', cors(),(req, res, next) => {
  res.setHeader('Content-Type', 'application/json'); // ustawienie ze to json
  request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var token = body.access_token;
        var options = {
          url: `https://api.spotify.com/v1/albums/${req.query.id}/tracks`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, (error, response, body) => {
          res.end(JSON.stringify(body));
        });
      }
    });
})

app.get('/', (req, res, next) => {
  res.redirect('https://spotify.com');
})

app.listen(3000);
