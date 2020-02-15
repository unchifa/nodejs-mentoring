import Joi from '@hapi/joi';

export const groupValidation = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),

    permissions: Joi.array()
        .items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
        .min(1)
});

export const groupUpdateValidation = Joi.object({
    permissions: Joi.array()
        .items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
        .min(1)
});
