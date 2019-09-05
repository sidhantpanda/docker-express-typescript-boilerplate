import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';

import HomeRouter from './router/home';
import BookRouter from './router/book';
import UserRouter from './router/user';

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.use('/', HomeRouter);
app.use('/book', BookRouter);
app.use('/user', UserRouter);

export default app;
