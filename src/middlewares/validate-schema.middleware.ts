import { Schema } from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';

export const validateSchema = (schema: Schema) => (req: Request, _: Response, next: NextFunction): any => {
    const config = { abortEarly: false, allowUnknown: false };
    const { error } = schema.validate(req.body, config);
    next(error);
};
