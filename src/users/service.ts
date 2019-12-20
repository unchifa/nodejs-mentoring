import { User } from './types';
import { UserModel } from './model';
import { UserUtils } from './utils';

export const UserService = {
    async select(loginSubstring?: string, limit?: string): Promise<User[]> {
        const users = await UserModel.select(loginSubstring, limit);
        return Promise.resolve(users);
    },

    async getById(id: string): Promise<User> {
        const user = await UserModel.find(id);
        return Promise.resolve(user);
    },

    async create(data: User): Promise<User> {
        const { login, password, age } = UserUtils.validate(data);
        if (!login || !password || !age) {
            return Promise.reject('error');
        }

        const user = await UserModel.create(login, password, age);
        return Promise.resolve(user);
    },

    async update(id: string, data: any): Promise<User> {
        const { login, age } = UserUtils.validate(data);

        const user = await UserModel.update(id, login, age);
        return Promise.resolve(user);
    },

    async delete(id: string): Promise<User> {
        const user = await UserModel.delete(id);
        return Promise.resolve(user);
    }
};
