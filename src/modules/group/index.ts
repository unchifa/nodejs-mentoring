import { Application } from 'express';
import { GroupRepository } from './data-access';
import { methodNotAllowed, validateSchema } from '../../middlewares';
import { groupUpdateValidation, groupValidation } from './model';
import { GroupController } from './controller';

export const initializeGroups = (app: Application): void => {
    app.route('/api/groups/:id/users')
        .get(GroupController.getUsers)
        .put(GroupController.addUsersToGroup)
        .all(methodNotAllowed);

    app.route('/api/groups/:id')
        .get(GroupController.getById)
        .put(validateSchema(groupUpdateValidation), GroupController.update)
        .delete(GroupController.delete)
        .all(methodNotAllowed);

    app.route('/api/groups')
        .get(GroupController.get)
        .post(validateSchema(groupValidation), GroupController.create)
        .all(methodNotAllowed);
};

export const initializeGroupTable = (): void => {
    GroupRepository.initialize();
};
