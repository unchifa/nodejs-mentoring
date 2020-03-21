import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import jwt from 'jsonwebtoken';

const { SECRET }: any = process.env;

export const checkToken = (req: Request, res: Response, next: NextFunction): void => {
    const token: string = get(req, "headers['x-access-token']");

    if (token) {
        jwt.verify(token, SECRET, (err: any) => {
            if (err) {
                res.status(403).send({
                    success: false,
                    message: 'Forbidden: Access to this resource is denied.'
                });
            } else {
                // eslint-disable-next-line callback-return
                next();
            }
        });
    } else {
        res.status(401).send({
            success: false,
            message: 'Unauthorized: Access to this resource is denied.'
        });
    }
};
