import { Document, Model, Schema, model } from 'mongoose';

export interface IBook extends Document {
  name: string;
  author: string;
}

interface IBookModel extends Model<IBook> { }

const schema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true }
});

const Book: IBookModel = model<IBook, IBookModel>('Book', schema);

export default Book;
