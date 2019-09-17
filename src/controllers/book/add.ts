import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Book from '../../models/Book';

let add: RequestHandler = async (req, res) => {
  const { name, author } = req.body;

  const book = new Book({ name, author });
  await book.save();

  res.send({
    message: `Saved`,
    book: book.toJSON()
  });
};

add = handleErrorMiddleware(add);

export default add;
