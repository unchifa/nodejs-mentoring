import { Application } from 'express';
import { GroupRepository } from './data-access';
import { methodNotAllowed, validateSchema } from '../../middlewares';
import { groupUpdateValidation, groupValidation } from './model';
import { GroupController } from './controller';
import { checkToken } from '../login/middleware';

export const initializeGroups = (app: Application): void => {
    app.route('/api/groups/:id/users')
        .get(checkToken, GroupController.getUsers)
        .put(checkToken, GroupController.addUsersToGroup)
        .all(methodNotAllowed);

    app.route('/api/groups/:id')
        .get(checkToken, GroupController.getById)
        .put(checkToken, validateSchema(groupUpdateValidation), GroupController.update)
        .delete(checkToken, GroupController.delete)
        .all(methodNotAllowed);

    app.route('/api/groups')
        .get(checkToken, GroupController.get)
        .post(checkToken, validateSchema(groupValidation), GroupController.create)
        .all(methodNotAllowed);
};

export const initializeGroupTable = (): void => {
    GroupRepository.initialize();
};
