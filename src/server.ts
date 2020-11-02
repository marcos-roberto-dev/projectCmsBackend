import 'reflect-metadata';
import express from 'express';

import routes from './routes';
import './database';
import exeptionError from './middlewares/exeptionError';

const server = express();
server.use(express.json());

server.use(routes);

server.use(exeptionError);

server.listen(3333, () => {
  console.log('🚦 Server is on');
});
