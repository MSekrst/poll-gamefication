import { Router } from 'express';
import { resolve } from 'path';

const router = Router();

// home route HTML return
router.get('/', (req, res) => {
  res.sendFile(resolve('public/html/home.html'));
});

export default router;
