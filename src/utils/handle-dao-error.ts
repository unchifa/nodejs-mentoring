import Boom from '@hapi/boom';

export const handleDaoError = (message: string) => (entity: any) => {
    if (!entity) {
        throw Boom.notFound(message);
    }
    return entity;
};
