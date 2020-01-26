import { Router } from 'express';
import { UserController } from './controller';

export const userRouter: Router = Router();

export const endpoints = {
    users: '/users',
    user: '/users/:id'
};

userRouter
    .route(endpoints.users)
    .get(UserController.get)
    .post(UserController.create);

userRouter
    .route(endpoints.user)
    .get(UserController.getById)
    .put(UserController.update)
    .delete(UserController.delete);
