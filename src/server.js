import './persistence/daos/factory.js';

import { __dirname, mongoStoreOptions} from './utils.js';

import express from 'express';
import { Server } from 'socket.io';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import session from 'express-session';
import { errorHandler } from './middlewares/errorHandler.js';
import * as services from './services/product.services.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './passport/local-strategy.js';
import './passport/github-strategy.js';
import './passport/google-strategy.js';
import router from './routes/index.js';
import 'dotenv/config';

const app = express();


app
  .use(cookieParser())
  .use(session(mongoStoreOptions))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(errorHandler)
  .use(morgan('dev'))
  .set('views', __dirname + '/views')
  .engine('handlebars', handlebars.engine())
  .set('view engine', 'handlebars')
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(__dirname + '/public'))
  .use('/', router);

const port = process.env.PORT || 3000;

const httpServer = app.listen(port, () => {
  console.log(
    `🚀 Server listening on port ${port} ! - http://localhost:${port}/`,
  );
});

export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
  getProductData(socket);

  socket.on('productCreated', () => {
    getProductData(socket);
  });
});

async function getProductData(socket) {
  const products = await services.getAll();
  socket.emit('productCreated', products);
}
