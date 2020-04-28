import { Request } from 'jest-express/lib/request';
import Joi from '@hapi/joi';
import requestMiddleware from '../../src/middleware/request-middleware';

let request: any;
let next: any;
let badRequest: any;

describe('Error Handling Middleware', () => {
  beforeEach(() => {
    next = jest.fn();
    request = new Request('/users?sort=desc', {
      headers: {
        Accept: 'text/html'
      }
    });
    badRequest = new Request('/users?sort=desc', {
      headers: {
        Accept: 'text/html'
      }
    });
    badRequest.setBody({
      stringValue: 14321
    });
  });

  afterEach(() => {
    request.resetMocked();
    next.mockClear();
  });

  test('API handles response behaviour when no error thrown', async () => {
    const res: any = {
      send: jest.fn()
    };

    expect(next).toHaveBeenCalledTimes(0);
    const sampleRoute = async (req?: any, response?: any) => {
      response.send();
    };

    const wrappedRoute = requestMiddleware(sampleRoute);
    await wrappedRoute(request, res, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('Handover request to express error handler on error', async () => {
    const err = new Error('test error');
    const sampleRoute = async (req?: any, res?: any, nextHandler?: any) => {
      throw err;
    };

    const wrappedRoute = requestMiddleware(sampleRoute);
    await wrappedRoute(request, null, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(err);
  });

  test('Handover request to express error handler on error', async () => {
    const sampleRoute = async (req?: any, res?: any, nextHandler?: any) => {
      res.send('Body is ok');
    };

    const bodySchema = Joi.object().keys({
      stringValue: Joi.string()
    });


    const wrappedRoute = requestMiddleware(sampleRoute, { validation: { body: bodySchema } });
    await wrappedRoute(badRequest, null, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
