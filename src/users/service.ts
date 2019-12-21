import { User } from './types';
import { UserModel } from './model';
import { userCreateSchema, userUpdateSchema } from './schema';

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
        try {
            const { login, password, age } = await userCreateSchema.validateAsync(data);
            const user = await UserModel.create(login, password, age);

            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async update(id: string, data: any): Promise<User> {
        try {
            const { login, age } = await userUpdateSchema.validateAsync(data);
            const user = await UserModel.update(id, login, age);

            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async delete(id: string): Promise<User> {
        const user = await UserModel.delete(id);
        return Promise.resolve(user);
    }
};
