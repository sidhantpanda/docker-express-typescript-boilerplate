import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Book from '../../models/Book';

/**
 * Builds a mongoose query object to search books according to book name and author name.
 * @param name String containing the book name or part of the book's name
 * @param author String containing the author name or part of the author's name
 */
const buildBookSeachQuery = (name?: string, author?: string): { [key: string]: any } => {
  const query: any = {};
  if (name) {
    query.name = new RegExp(`.*${name}.*`, 'i');
  }
  if (author) {
    query.author = new RegExp(`.*${author}.*`, 'i');
  }

  return query;
};

interface SearchReqBody {
  name?: string;
  author?: string;
}

const search: RequestHandler = async (req: Request<{}, {}, {}, SearchReqBody>, res) => {
  const { name, author } = req.query;

  const query = buildBookSeachQuery(name, author);
  const books = await Book.find(query);
  res.send({ books });
};

export default requestMiddleware(search);
