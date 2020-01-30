import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Book from '../../models/Book';

const all: RequestHandler = async (req, res) => {
  const books = await Book.find();
  res.send({ books });
};

export default handleErrorMiddleware(all);
