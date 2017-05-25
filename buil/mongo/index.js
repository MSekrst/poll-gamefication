'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDb = exports.connectDatabase = undefined;

var _mongodb = require('mongodb');

var _settings = require('../config/settings');

var dbHandler = void 0;

var connectDatabase = exports.connectDatabase = function connectDatabase() {
  _mongodb.MongoClient.connect(_settings.mongoConnectionString, function (err, db) {
    if (err) {
      console.log('Error while connecting to the cloud', err);
      return;
    }

    console.log('Successfully connected to database');
    dbHandler = db;
  });
};

var getDb = exports.getDb = function getDb() {
  return dbHandler;
};