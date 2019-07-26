import { RequestHandler } from 'express';

const getUsers: RequestHandler = async (req, res) => {
    res.send('Get users route');
};

export {
    getUsers
};
