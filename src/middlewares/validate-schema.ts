import Boom from '@hapi/boom';
import { Schema } from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';

type Validation = {
    error?: Error;
    value: Object;
};

export const validateSchema = (schema: Schema) => (req: Request, _res: Response, next: NextFunction): void => {
    const config = { abortEarly: false, allowUnknown: false };
    const validation: Validation = schema.validate(req.body, config);

    if (validation.error) {
        const { message } = validation.error;
        // eslint-disable-next-line callback-return
        next(Boom.badRequest(message));
    } else {
        // eslint-disable-next-line callback-return
        next();
    }
};
