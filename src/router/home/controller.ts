import { RequestHandler } from 'express';

const homeRoute: RequestHandler = async (req, res) => {
    res.send('Home Route');
};

export { homeRoute };
