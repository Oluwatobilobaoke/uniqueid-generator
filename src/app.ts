import express from 'express';
import path from 'path';

import * as homeRoute from './requestHandlers/home';
import * as idGenRoute from './requestHandlers/id-gen';
// Create Express server
const app: express.Express = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', homeRoute.index);
app.post('/api/v1/generate', idGenRoute.generate);

app.use((_req, res): void => {
  res.status(404).send({
    success: false,
    error: 'resource not found',
  });
});

export default app;
