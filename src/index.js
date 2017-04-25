import express from 'express';
import url from 'url';
import shortid from 'shortid';
import DB from './db';

const db = new DB();

const app = express();

app.get('/new/:url(*)', (req, res) => {
  const parsedUrl = url.parse(req.params.url);

  if (!parsedUrl.protocol || !parsedUrl.host) {
    return res.json({
      error: 'Wrong url format, make sure you have a valid protocol and real site.'
    });
  }

  //Generate id
  //Store id
  const id = shortid.generate();

  db.add({
    id,
    url: req.params.url
  });

  const fullUrl = `${req.protocol}://${req.get('host')}/${id}`;

  const response = {
    originalUrl: req.params.url,
    shortUrl: fullUrl
  };
  res.json(response);
});

app.get('/:urlId', (req, res) => {
  db.get(req.params.urlId)
    .then((result) => {
      if (!result) {
        return res.json({
          error: 'This url is not on the database.'
        });
      }
      console.log(result, req.params.urlId);

      res.redirect(result.url);
    })
    .catch();
});

const port = process.env.PORT || 8080;

app.listen(port);
