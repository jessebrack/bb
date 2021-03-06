import next from 'next';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import mongoSessionStore from 'connect-mongo';
import dotenv from 'dotenv';
import auth from './google';
import logger from './logs';
import Chapter from './models/Chapter';
import api from './api';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = process.env.MONGO_URL_TEST;

// Connect to DB
mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true },
);

// Port setup
const port = process.env.PORT || 8000;
const ROOT_URL = process.env.ROOT_URL || `http://localhost:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const MongoStore = mongoSessionStore(session);

  const sess = {
    name: 'book.sid',
    secret: 'HD2w.)q*VqRT4/#NK2M/,E^B)}FED5fWU!dKe[wk',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 14 * 24 * 60 * 60 * 100,
    },
  };

  server.use(session(sess));

  auth({ server, ROOT_URL });

  const URL_MAP = {
    '/login': '/public/login',
  };

  api(server);

  server.get('*', (req, res) => {
    const url = URL_MAP[req.path];
    if (url) {
      app.render(req, res, url);
    } else {
      handle(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`);
  });
});
