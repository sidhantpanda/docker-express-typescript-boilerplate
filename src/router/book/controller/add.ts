import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../../middleware/handle-error-middleware';
import Book from '../../../models/Book';

let add: RequestHandler = async (req, res) => {
  res.send('Get users route');
};

add = handleErrorMiddleware(add);

export default add;
