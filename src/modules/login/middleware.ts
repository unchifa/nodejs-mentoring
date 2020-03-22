import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';

const { SECRET }: any = process.env;

export const checkToken = (req: Request, _res: Response, next: NextFunction): void => {
    const token: string = get(req, "headers['x-access-token']");

    if (token) {
        jwt.verify(token, SECRET, (err: any) => {
            if (err) {
                // eslint-disable-next-line callback-return
                next(Boom.forbidden('Forbidden: Access to this resource is denied.'));
            } else {
                // eslint-disable-next-line callback-return
                next();
            }
        });
    } else {
        // eslint-disable-next-line callback-return
        next(Boom.unauthorized('Unauthorized: Access to this resource is denied.'));
    }
};
