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
  const collection = { polls: [], user: req.body, experience: [] };

  db.collection('polls').insertOne(collection).then((data) => {
    res.status(200).json(data.insertedId);
  }).catch(err => {
    res.status(500).json(err);
  });
});

router.post('/save/polls/:id', (req, res) => {
  const db = getDb();

  const _id = ObjectID(req.params.id);
  db.collection('polls').findOneAndUpdate({ _id },
    { $push: { polls: req.body.polls[0], timeInGame: req.body.timeInGame} }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).end();
    });

});

router.post('/save/ux/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  const db = getDb();

  const _id = ObjectID(req.params.id);

  db.collection('polls').findOneAndUpdate({ _id },
    { $push: { experience: req.body.experience } }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).end();
    });

});

export default router;
