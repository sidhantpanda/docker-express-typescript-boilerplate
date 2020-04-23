import request from 'supertest';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import BookModel from '../../src/models/Book';

describe('test mongoose User model', () => {
  test('should return the doc with findById', () => {
    const returnValue = {
      _id: '507f191e810c19729de860ea',
      name: 'name',
      author: 'author'
    };

    mockingoose(BookModel).toReturn(returnValue, 'findOne');

    return BookModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(returnValue);
    });
  });

  // test('should return the doc with update', () => {
  //   const _doc = {
  //     _id: '507f191e810c19729de860ea',
  //     name: 'name',
  //     email: 'name@email.com',
  //   };

  //   mockingoose(model).toReturn(doc, 'update');

  //   return model
  //     .update({ name: 'changed' }) // this won't really change anything
  //     .where({ _id: '507f191e810c19729de860ea' })
  //     .then(doc => {
  //       expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
  //     });
  // });
});