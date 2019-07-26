import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';

let getUsers: RequestHandler = async (req, res) => {
    res.send('Get users route');
};

getUsers = handleErrorMiddleware(getUsers);

export { getUsers };
