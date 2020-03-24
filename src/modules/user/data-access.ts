import Boom from '@hapi/boom';
import { UserModel, UserDTO } from './model';
import { UserUpdateType } from './types';
import { handleDaoError } from '../../utils';
import users from '../../../data/users.json';

export const UserRepository = {
    initialize: (): void => {
        UserModel.bulkCreate(users);
    },

    select: (options: Record<string, any>): Promise<UserModel[]> => {
        return UserModel.findAll(options);
    },

    getById: (id: string): Promise<UserModel> => {
        return UserModel.findByPk(id).then(handleDaoError('User not found'));
    },

    login: (login: string, password: string): Promise<UserModel> => {
        // todo use bcrypt for password
        return UserModel.findOne({
            where: { login, password },
            attributes: ['id']
        });
    },

    create: async (dto: UserDTO): Promise<UserModel> => {
        const [user, created]: [UserModel, boolean] = await UserModel.findOrCreate({
            where: { login: dto.login },
            defaults: dto
        });

        if (!created) {
            throw Boom.conflict('This login already in use');
        }

        return user;
    },

    update: (id: string, { login, age }: UserUpdateType): Promise<UserModel> => {
        return UserModel.findByPk(id)
            .then(handleDaoError('User not found'))
            .then((instance: UserModel) => {
                instance.login = login || instance.login;
                instance.age = age || instance.age;
                instance.save();
                return instance;
            });
    },

    delete: (id: string): Promise<UserModel> => {
        return UserModel.destroy({ where: { id } }).then(handleDaoError('User not found'));
    }
};
