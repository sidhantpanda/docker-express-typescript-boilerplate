import {
  Model, Schema, model
} from 'mongoose';
import TimeStampPlugin, {
  ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface IBook extends ITimeStampedDocument {
  /** Name of the book */
  name: string;
  /** Name of the author */
  author: string;
}

interface IBookModel extends Model<IBook> { }

const schema = new Schema<IBook>({
  name: { type: String, index: true, required: true },
  author: { type: String, index: true, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Book: IBookModel = model<IBook, IBookModel>('Book', schema);

export default Book;
