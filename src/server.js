import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { config } from 'dotenv';
import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

config();
const { PORT, NODE_ENV, FOLDER, API_URL } = process.env;
const serverFolder = FOLDER || '/';
const serverPORT = PORT || 3000;
const apiUrl = API_URL || '';
const dev = NODE_ENV === 'development';
const FileStore = sessionFileStore(session);

polka()
  .use(json())
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
      store: new FileStore({
        path: `.sessions`,
      }),
    })
  )
  .use(serverFolder,
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req) => ({
        page: req.session && req.session.page,
        apiUrl: apiUrl,
      })
    })
  )
  .listen(serverPORT, err => {
    if (err) console.log('error', err);
  });
