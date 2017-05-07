import {Router} from 'express';
import {resolve} from 'path';

import {getDb} from '../mongo';

const router = Router();

// home route HTML return
router.get('/', (req, res) => {
  res.sendFile(resolve('public/html/home.html'));
})

router.get('/anketa', (req, res) => {
  res.sendFile(resolve('public/html/anketa.html'));
});

router.get('/startGame', (req, res) => {
  res.sendFile(resolve('public/html/game.html'));
})

router.post('/save', (reg, res) => {
  const db = getDb();
  console.log(req.body);
  db.collection('poll').insertOne(req.body, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
  })
});

export default router;
