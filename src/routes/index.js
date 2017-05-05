import { Router } from 'express';
import { resolve } from 'path';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(resolve('public/html/home.html'));
});

export default router;
