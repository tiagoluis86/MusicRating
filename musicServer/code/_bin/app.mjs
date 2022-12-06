import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import composerRouter from '../composer/router.mjs';
import albumRouter from '../album/router.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/composers', composerRouter);
app.use('/albuns', albumRouter);

app.use(express.static(`${__dirname}/public`));

export default app;