import Joi from '@hapi/joi';

const login = Joi.string()
    .alphanum()
    .min(3)
    .max(50);
const password = Joi.string().pattern(new RegExp(/(?=.*[A-Za-z])(?=.*\d)[0-9A-Za-z]{6,}/));
const age = Joi.number()
    .integer()
    .min(4)
    .max(130);

export const userValidation = Joi.object({
    login: login.required(),
    password: password.required(),
    age: age.required()
});

export const userUpdateValidation = Joi.object({ login, password, age });
