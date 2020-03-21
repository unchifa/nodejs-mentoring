import { Application } from 'express';
import { methodNotAllowed, validateSchema } from '../../middlewares';
import { LoginController } from './controller';

import Joi from '@hapi/joi';

const userValidation = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required()
});

export const initializeLogin = (app: Application): void => {
    app.route('/api/login')
        .post(validateSchema(userValidation), LoginController.login)
        .all(methodNotAllowed);
};
