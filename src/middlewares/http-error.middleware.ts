import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../components';

export const httpError = () => (err: HttpException, _req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message } = err;
    res.status(status).json({ status, message });
    next(err);
};
