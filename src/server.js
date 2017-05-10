import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { port, host } from './config/settings.js';
import router from './routes/index.js';
import { connectDatabase } from './mongo/index.js';

const app = express();

// create database connections pool
connectDatabase();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from 'public'
app.use(express.static('public'));

// connect router on server
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at ${host}:${port}`);
});

