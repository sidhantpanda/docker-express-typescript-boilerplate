import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';

import BookRouter from './router/book';

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.use('/book', BookRouter);

export default app;
