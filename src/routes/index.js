import {Router} from 'express';
import {resolve} from 'path';

import {getDb} from '../mongo';

const router = Router();

// home route HTML return
router.get('/', (req, res) => {
  res.sendFile(resolve('public/html/home.html'));
});

router.get('/game', (req, res) => {
  res.sendFile(resolve('public/html/game.html'));
});

router.post('/save', (req, res) => {
  const db = getDb();
  db.collection('poll').insertOne(req.body, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
  })

  res.redirect('/game');
});

export default router;
