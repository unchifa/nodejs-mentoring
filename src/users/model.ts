import { toNumber, take, findIndex } from 'lodash';
import { User } from './types';
import { UserUtils } from './utils';
import { UserDTO } from './dto';

const users = [
    {
        login: 'Max',
        password: '123456',
        age: 24
    },
    {
        login: 'Dan',
        password: '123456',
        age: 33
    },
    {
        login: 'Oleg',
        password: '123456',
        age: 16
    },
    {
        login: 'Roman',
        password: '123456',
        age: 41
    },
    {
        login: 'Alex',
        password: '123456',
        age: 28
    },
    {
        login: 'Dimas',
        password: '123456',
        age: 24
    }
].map(({ login, password, age }) => new UserDTO(login, password, age));

export class UserModel {
    static async select(loginSubstring?: string, limit?: string): Promise<User[]> {
        // todo make chain
        let preparedUsers = users.filter(({ isDeleted }) => !isDeleted).map(UserUtils.prepareForPublicAPI);

        if (loginSubstring) {
            const substring = loginSubstring.toLowerCase();
            preparedUsers = preparedUsers.filter(({ login }) => login.toLowerCase().indexOf(substring) !== -1);
        }

        if (limit) {
            preparedUsers = take(preparedUsers, toNumber(limit));
        }

        return Promise.resolve(preparedUsers);
    }

    static async create(login: string, password: string, age: string): Promise<User> {
        // todo check login for uniq
        const user = new UserDTO(login, password, toNumber(age));
        users.push(user);

        return Promise.resolve(UserUtils.prepareForPublicAPI(user));
    }

    static async find(id: string): Promise<User> {
        const users = await UserModel.select();
        const user = users.find(user => user.id === id);

        return user ? Promise.resolve(user) : Promise.reject('User is not found');
    }

    static async update(id: string, login: string, age: string): Promise<User> {
        const index = findIndex(users, { id });
        if (index === -1) {
            return Promise.reject('User is not found');
        }
        const user = users[index];
        const newUser = {
            ...user,
            login: login || user.login,
            age: toNumber(age) || user.age
        };
        users.splice(index, 1, newUser);

        return Promise.resolve(UserUtils.prepareForPublicAPI(newUser));
    }

    static async delete(id: string): Promise<User> {
        const index = findIndex(users, { id });
        if (index === -1) {
            return Promise.reject('User is not found');
        }
        const user = users[index];
        user.isDeleted = true;

        return Promise.resolve(UserUtils.prepareForPublicAPI(user));
    }
}
