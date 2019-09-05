import { RequestHandler } from 'express';

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 * 
 * @param handler Request handler to check for error
 */
const handleErrorMiddleware = (handler: RequestHandler): RequestHandler => async (req, res, next) => {
    handler(req, res, next).catch(next);
};

export default handleErrorMiddleware;