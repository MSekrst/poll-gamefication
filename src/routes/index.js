import { Router } from 'express';
import { resolve } from 'path';
import { ObjectID } from 'mongodb';

import { getDb } from '../mongo';

const router = Router();

// home route HTML return
router.get('/', (req, res) => {
  res.sendFile(resolve('public/html/home.html'));
});

router.get('/anketa', (req, res) => {
  res.sendFile(resolve('public/html/home.html'));
});

router.get('/anketa/game', (req, res) => {
  res.sendFile(resolve('public/html/game.html'));
});

router.get('/anketa/finish', (req, res) => {
  res.sendFile(resolve('public/html/finish.html'));
});

router.get('/anketa/game/:id', (req, res) => {
  const db = getDb();

  let oid;

  try {
    oid = ObjectID(req.params.id) || null;
  } catch (err) {
    return res.redirect('/anketa/game');
  }

  db.collection('polls').find({ _id: oid }).toArray((err, data) => {
    if (err) {
      return res.status(500).end();
    }

    if (data[0]) {
      return res.sendFile(resolve('public/html/game.html'));
    } else {
      return res.redirect('/anketa');
    }
  });
});

router.get('/anketa/finish/:id', (req, res) => {
  const db = getDb();

  let oid;

  try {
    oid = ObjectID(req.params.id) || null;
  } catch (err) {
    return res.redirect('/game');
  }

  db.collection('polls').find({ _id: oid }).toArray((err, data) => {
    if (err) {
      return res.status(500).end();
    }

    if (data[0]) {
      return res.sendFile(resolve('public/html/finish.html'));
    } else {
      return res.redirect('/anketa');
    }
  });
});

// api routes

router.post('/user', (req, res) => {
  const db = getDb();
  const collection = { polls: [], user: req.body, experience: [], timeInGame: -1 };

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
    { $set: { timeInGame: req.body.timeInGame }, $push: { polls: req.body.polls[0] } }, err => {
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
    { $push: { experience: req.body.experience } }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).end();
    });
});

router.get('/results', (req, res) => {
  const db = getDb();

  db.collection('polls').find({timeInGame : { $gt: 0}}).sort({ timeInGame: 1 }).limit(10).toArray((err, data) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    return res.status(200).json(data);
  });
});

export default router;
