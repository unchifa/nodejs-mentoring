import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { UserModel } from './model';
import { UserService } from './service';
import { logger } from '../../utils/logger';

export const UserController = {
    get: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const loginSubstring = get(req, 'query.login');
            const limit = get(req, 'query.limit');

            // TODO remove password
            const users: UserModel[] = await UserService.select(loginSubstring, limit);

            res.json(users);
        } catch (e) {
            logger.error(e);
            // eslint-disable-next-line callback-return
            next(e);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const user: UserModel = await UserService.getById(id);

            res.json(user);
        } catch (e) {
            logger.error(e);
            // eslint-disable-next-line callback-return
            next(e);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const login = get(req, 'body.login');
            const password = get(req, 'body.password');
            const age = get(req, 'body.age', null);

            const user: UserModel = await UserService.create({ login, password, age });

            res.status(201).json(user);
        } catch (e) {
            logger.error(e);
            // eslint-disable-next-line callback-return
            next(e);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');
            const age = get(req, 'body.age', null);
            const login = get(req, 'body.login', null);

            const user: UserModel = await UserService.update(id, { age, login });

            res.json(user);
        } catch (e) {
            logger.error(e);
            // eslint-disable-next-line callback-return
            next(e);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const user: UserModel = await UserService.delete(id);

            res.json(user);
        } catch (e) {
            logger.error(e);
            // eslint-disable-next-line callback-return
            next(e);
        }
    }
};
