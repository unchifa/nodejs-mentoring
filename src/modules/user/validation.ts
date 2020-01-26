import Joi from '@hapi/joi';

const login = Joi.string()
    .alphanum()
    .min(3)
    .max(50);
const age = Joi.number()
    .min(4)
    .max(130);
const password = Joi.string()
    .pattern(new RegExp(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/))
    .required();

export const userCreateSchema = Joi.object({
    login: login.concat(Joi.string().required()),
    age: age.concat(Joi.number().required()),
    password
});

export const userUpdateSchema = Joi.object({ login, age });
