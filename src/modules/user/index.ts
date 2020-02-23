import { Application } from 'express';
import { methodNotAllowed, validateSchema } from '../../middlewares';
import { userValidation } from './model';
import { UserRepository } from './data-access';
import { UserController } from './controller';

export const initializeUsers = (app: Application): void => {
    app.route('/api/users')
        .get(UserController.get)
        .post(validateSchema(userValidation), UserController.create)
        .all(methodNotAllowed);

    app.route('/api/users/:id')
        .get(UserController.getById)
        .put(UserController.update)
        .delete(UserController.delete)
        .all(methodNotAllowed);
};

export const initializeUserTable = (): void => {
    UserRepository.initialize();
};
