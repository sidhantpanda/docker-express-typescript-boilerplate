import { RequestHandler } from 'express';

export default class UsersController {
    public getUsers: RequestHandler = async (req, res, next) => {
        res.send('Get users route');
    };
}
