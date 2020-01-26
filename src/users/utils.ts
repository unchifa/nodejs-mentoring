import { User } from './types';

export const UserUtils = {
    prepareForPublicAPI({ id, login, age }: User): User {
        return {
            id,
            login,
            age
        };
    }
};
