import { NextFunction, Request, Response } from 'express';
import { UserService } from './service';

export const UserController = {
    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { loginSubstring, limit } = req.query;
            const users = await UserService.select(loginSubstring, limit);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // todo make validation
            const user = await UserService.create(req.body);
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const user = await UserService.getById(id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const user = await UserService.update(id, req.body);
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const user = await UserService.delete(id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};
