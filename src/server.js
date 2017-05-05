import express from 'express';
import bodyParser from 'body-parser';

import { port, host } from './config/settings.js';
import router from './routes/index.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from 'public'
app.use(express.static('public'));

// connect router on server
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at ${host}:${port}`);
});
