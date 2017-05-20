import { Router } from 'express';
import { resolve } from 'path';
import { ObjectID } from 'mongodb';

import { getDb } from '../mongo';

const router = Router();

// home route HTML return
router.get('/', (req, res) => {
  res.sendFile(resolve('public/html/home.html'));
});

router.get('/game', (req, res) => {
  res.sendFile(resolve('public/html/game.html'));
});

router.get('/finish', (req, res) => {
  res.sendFile(resolve('public/html/end.html'));
});

// api routes

router.post('/user', (req, res) => {
  const db = getDb();
  console.log(req.body);
  const collection = { polls: [], user: req.body, experience: {} };

  db.collection('polls').insertOne(collection).then((data) => {
    res.status(200).json(data.insertedId);
  }).catch(err => {
    res.status(500).json(err);
  });
});

router.post('/save/polls/:id', (req, res) => {
  const db = getDb();

  const _id = ObjectID(req.params.id);
console.log("tu");
  db.collection('polls').findOneAndUpdate({ _id },
    { $push: { polls: req.body.polls, timeInGame: req.body.timeInGame} }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).end();
    });

});

router.post('/save/ux/:id', (req, res) => {
  const db = getDb();

  const _id = ObjectID(req.params.id);

  db.collection('polls').findOneAndUpdate({ _id },
    { experience: req.body.experience }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).end();
    });

});

export default router;
