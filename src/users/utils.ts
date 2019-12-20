import { User } from './types';

export const UserUtils = {
    prepareForPublicAPI({ id, login, age }: User): User {
        return {
            id,
            login,
            age
        };
    },
    validate(user: any): any {
        if (!user) {
            return {};
        }
        return user;
    }
};
