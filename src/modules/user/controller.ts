import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { UserServiceInterface } from './interfaces';

export class UserController {
    private readonly service: UserServiceInterface;

    constructor(service: UserServiceInterface) {
        this.service = service;
    }

    public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const loginSubstring = get(req, 'query.login');
            const limit = get(req, 'query.limit');
            const users = await this.service.select(loginSubstring, limit);

            res.json(users);
        } catch (e) {
            next(e);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');
            const user = await this.service.getById(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { body = {} } = req;
            const user = await this.service.create(body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');
            const { body = {} } = req;
            const user = await this.service.update(id, body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');
            const user = await this.service.delete(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };
}
