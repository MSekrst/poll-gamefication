import { MongoClient } from 'mongodb';

import { mongoConnectionString } from '../config/sensitive';

let dbHandler;

module.exports.connectDatabase = function(){
  MongoClient.connect(mongoConnectionString, (err, db) => {
    if (err) {
      console.log('Error while connecting to the mongo!');
    }

    console.log('Successfully connected to database');
    dbHandler = db;
  });
};

export const getDb = function () {
  return dbHandler;
};
