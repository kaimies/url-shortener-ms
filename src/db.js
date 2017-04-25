import {
  MongoClient
} from 'mongodb';

export default class DB {
  add(value) {
    MongoClient.connect('mongodb://localhost:27017/urlshortener', (err, db) => {
      if (err) {
        throw err;
      }

      db.collection('urls').insert(value, (err, result) => {
        if (err) {
          throw err;
        }
      });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      MongoClient.connect('mongodb://localhost:27017/urlshortener', (err, db) => {
        if (err) {
          reject(err);
        }

        db.collection('urls').findOne({
          id,
        }, (err, result) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        });
      });
    });
  }
}
