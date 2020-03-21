import { Application } from 'express';
import { methodNotAllowed, validateSchema } from '../../middlewares';
import { userValidation } from './model';
import { UserRepository } from './data-access';
import { UserController } from './controller';
import { checkToken } from '../login/middleware';

export const initializeUsers = (app: Application): void => {
    app.route('/api/users')
        .get(checkToken, UserController.get)
        .post(checkToken, validateSchema(userValidation), UserController.create)
        .all(methodNotAllowed);

    app.route('/api/users/:id')
        .get(checkToken, UserController.getById)
        .put(checkToken, UserController.update)
        .delete(checkToken, UserController.delete)
        .all(methodNotAllowed);
};

export const initializeUserTable = (): void => {
    UserRepository.initialize();
};
