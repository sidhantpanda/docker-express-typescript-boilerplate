import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Book from '../../models/Book';

const remove: RequestHandler = async (req: Request, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).send({
      error: 'Book not found'
    });
  }

  await book.delete();
  return res.status(204).send();
};

export default requestMiddleware(remove);
