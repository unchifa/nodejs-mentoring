import { UserModel, UserDTO } from './model';
import { UserUpdateType } from './types';
import { createSequelizeFindOptions } from '../../utils';
import { UserRepository } from './data-access';

export const UserService = {
    select: (loginSubstring?: string, limit?: string): Promise<UserModel[]> => {
        const options = createSequelizeFindOptions({ login: loginSubstring }, limit);
        return UserRepository.select(options);
    },

    login: (login: string, password: string): Promise<UserModel> => {
        return UserRepository.login(login, password);
    },

    getById: (id: string): Promise<UserModel> => {
        return UserRepository.getById(id);
    },

    create({ login, password, age }: UserDTO): Promise<UserModel> {
        const dto: UserDTO = new UserDTO(login, password, age);
        return UserRepository.create(dto);
    },

    update(id: string, { login, age }: UserUpdateType): Promise<UserModel> {
        return UserRepository.update(id, { login, age });
    },

    delete: (id: string): Promise<UserModel> => {
        return UserRepository.delete(id);
    }
};
