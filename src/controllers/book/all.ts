import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Book from '../../models/Book';

const all: RequestHandler = async (req, res) => {
  const books = await Book.find();
  res.send({ books });
};

export default requestMiddleware(all);
