import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Book from '../../models/Book';

export const addBookSchema = Joi.object().keys({
  name: Joi.string().required(),
  author: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const { name, author } = req.body;

  const book = new Book({ name, author });
  await book.save();

  res.send({
    message: 'Saved',
    book: book.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addBookSchema } });
