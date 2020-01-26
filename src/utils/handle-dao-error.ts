import createError from 'http-errors';

export const handleDaoError = (message: string) => (entity: any) => {
    if (!entity) {
        throw createError(404, message);
    }
    return entity;
};
