/* eslint no-param-reassign:0*/
import { Document, Schema } from 'mongoose';

export interface ITimeStampedDocument extends Document {
  /** Timestamp at creation in milliseconds */
  createdAt: number;
  /** Timestamp at updation in milliseconds */
  updatedAt: number;
}

const TimeStampPlugin = function <T> (schema: Schema<T>) {
  schema.add({ createdAt: { type: Number, index: true } });
  schema.add({ updatedAt: { type: Number, index: true } });

  schema.pre<ITimeStampedDocument>('save', function (next) {
    if (this.isNew) {
      this.createdAt = new Date().getTime();
    }
    this.updatedAt = new Date().getTime();
    next();
  });
};

export default TimeStampPlugin;
