import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../../middleware/handle-error-middleware';
import Book from '../../../models/Book';

let get: RequestHandler = async (req, res) => {
  const { author, name } = req.query;
  const books = await Book.find({
    name: new RegExp(`^${name}$`, 'i'),
    author: new RegExp(`^${author}$`, 'i'),
  });

  res.send({ books });
};

get = handleErrorMiddleware(get);

export default get;