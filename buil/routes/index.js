'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _path = require('path');

var _mongodb = require('mongodb');

var _mongo = require('../mongo');

var router = (0, _express.Router)();

// home route HTML return
router.get('/', function (req, res) {
  res.sendFile((0, _path.resolve)('public/html/home.html'));
});

router.get('/game', function (req, res) {
  res.sendFile((0, _path.resolve)('public/html/game.html'));
});

router.get('/finish', function (req, res) {
  res.sendFile((0, _path.resolve)('public/html/finish.html'));
});

// api routes

router.post('/user', function (req, res) {
  var db = (0, _mongo.getDb)();
  var collection = { polls: [], user: req.body, experience: [] };

  db.collection('polls').insertOne(collection).then(function (data) {
    res.status(200).json(data.insertedId);
  }).catch(function (err) {
    res.status(500).json(err);
  });
});

router.post('/save/polls/:id', function (req, res) {
  var db = (0, _mongo.getDb)();

  var _id = (0, _mongodb.ObjectID)(req.params.id);
  db.collection('polls').findOneAndUpdate({ _id: _id }, { $set: { timeInGame: req.body.timeInGame }, $push: { polls: req.body.polls[0] } }, function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(201).end();
  });
});

router.post('/save/ux/:id', function (req, res) {
  var db = (0, _mongo.getDb)();

  var _id = (0, _mongodb.ObjectID)(req.params.id);

  db.collection('polls').findOneAndUpdate({ _id: _id }, { $push: { experience: req.body.experience } }, function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(201).end();
  });
});

router.get('/results', function (req, res) {
  var db = (0, _mongo.getDb)();

  db.collection('polls').find({}).sort({ timeInGame: 1 }).limit(10).toArray(function (err, data) {
    if (err) {
      res.status(500).json(err);
      return;
    }

    return res.status(200).json(data);
  });
});

exports.default = router;