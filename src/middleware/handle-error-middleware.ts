import { RequestHandler } from 'express';

const handleErrorMiddleware = (handler: RequestHandler): RequestHandler => async (req, res, next) => {
    handler(req, res, next).catch(next);
};

export default handleErrorMiddleware;
