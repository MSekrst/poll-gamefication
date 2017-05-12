import { Router } from 'express';
import { resolve } from 'path';

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
  res.sendFile(resolve('public/html/finish.html'));
});

router.post('/save', (req, res) => {
  const poll = {
    user: req.body.user,
    answers: req.body.polls,
  };

  const db = getDb();

  db.collection('polls').insertOne(poll, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
  });

  res.status(201).end();
});

export default router;
