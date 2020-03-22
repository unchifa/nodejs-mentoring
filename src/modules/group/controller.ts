import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { GroupModel } from './model';
import { UsersFromGroup } from './types';
import { GroupService } from './service';

export const GroupController = {
    get: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const nameSubstring = get(req, 'query.name');
            const limit = get(req, 'query.limit');

            const groups: GroupModel[] = await GroupService.select(nameSubstring, limit);

            res.json(groups);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const group: GroupModel = await GroupService.getById(id);

            res.json(group);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const name = get(req, 'body.name');
            const permissions = get(req, 'body.permissions');

            const group: GroupModel = await GroupService.create({ name, permissions });

            res.status(201).json(group);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');
            const permissions = get(req, 'body.permissions');

            const group: GroupModel = await GroupService.update(id, permissions);

            res.json(group);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            await GroupService.delete(id);

            res.status(200);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    },

    getUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const users: UsersFromGroup[] = await GroupService.getUsers(id);

            res.json(users);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    },

    addUsersToGroup: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');
            const userIds = get(req, 'body.userIds', []);

            await GroupService.addUsersToGroup(id, userIds);

            res.status(200);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }
};
