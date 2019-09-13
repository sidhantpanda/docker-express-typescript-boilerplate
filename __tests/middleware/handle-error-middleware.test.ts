import { Request } from 'jest-express/lib/request';
import handleErrorMiddleware from '../../src/middleware/handle-error-middleware';

let request: any;
let next: any;

describe('Error Handling Middleware', () => {
  beforeEach(() => {
    next = jest.fn();
    request = new Request('/users?sort=desc', {
      headers: {
        Accept: 'text/html',
      },
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
    const sampleRoute = async (req?: any, res?: any, next?: any) => {
      res.send();
    };

    const wrappedRoute = handleErrorMiddleware(sampleRoute);
    await wrappedRoute(request, res, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('Handover request to express error handler on error', async () => {
    const next = jest.fn();
    const err = new Error('test error');
    const sampleRoute = async (req?: any, res?: any, next?: any) => {
      throw err;
    };

    const wrappedRoute = handleErrorMiddleware(sampleRoute);
    await wrappedRoute(request, null, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(err);
  });
});