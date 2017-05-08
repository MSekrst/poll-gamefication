import { MongoClient } from 'mongodb';

import { mongoConnectionString } from '../config/settings';

let dbHandler;

export const connectDatabase = () => {
  MongoClient.connect(mongoConnectionString, (err, db) => {
    if (err) {
      console.log('Error while connecting to the cloud', err);
      return;
    }

    console.log('Successfully connected to database');
    dbHandler = db;
  });
};

export const getDb = function () {
  return dbHandler;
};
