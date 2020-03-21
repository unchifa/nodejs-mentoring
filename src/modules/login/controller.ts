import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { get, toNumber } from 'lodash';
import { logger } from '../../utils/logger';
import { UserModel } from '../user/model';
import { UserService } from '../user/service';

const { SECRET, JWT_EXPIRES }: any = process.env;

export const LoginController = {
    login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const login = get(req, 'body.login');
            const password = get(req, 'body.password');

            const user: UserModel = await UserService.login(login, password);
            const token = jwt.sign({ sub: user.id }, SECRET, { expiresIn: toNumber(JWT_EXPIRES) });

            res.json(token);
        } catch (e) {
            // todo create decorator for controller methods
            logger.error(e);
            // eslint-disable-next-line callback-return
            next(e);
        }
    }
};
