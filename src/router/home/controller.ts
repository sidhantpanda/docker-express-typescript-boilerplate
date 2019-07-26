import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';

let homeRoute: RequestHandler = async (req, res) => {
    res.send('Home Route');
};

homeRoute = handleErrorMiddleware(homeRoute);

export { homeRoute };
