import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../../middleware/handle-error-middleware';
import Book from '../../../models/Book';

let get: RequestHandler = async (req, res) => {
  res.send('Get users route');
};

get = handleErrorMiddleware(get);

export default get;