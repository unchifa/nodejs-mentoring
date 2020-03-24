import Boom from '@hapi/boom';
import { Transaction } from 'sequelize';
import { GroupModel, GroupDTO } from './model';
import { handleDaoError } from '../../utils';
import { Permission } from './constants';
import { sequelize } from '../../../resources';
import { UserModel } from '../user/model';
import { UsersFromGroup } from './types';
import { UserGroupModel } from '../user-group/model';
import groups from '../../../data/groups.json';

export const GroupRepository = {
    initialize: (): void => {
        GroupModel.bulkCreate(groups);
    },

    select: (options: Object): Promise<GroupModel[]> => {
        return GroupModel.findAll(options);
    },

    getById: (id: string): Promise<GroupModel> => {
        return GroupModel.findByPk(id).then(handleDaoError('Group not found'));
    },

    create: async (dto: GroupDTO): Promise<GroupModel> => {
        const [group, created]: [GroupModel, boolean] = await GroupModel.findOrCreate({
            where: { name: dto.name },
            defaults: dto
        });

        if (!created) {
            throw Boom.conflict('This name already in use');
        }

        return group;
    },

    update: (id: string, permissions: Permission[]): Promise<GroupModel> => {
        return GroupModel.findByPk(id)
            .then(handleDaoError('Group not found'))
            .then((instance: GroupModel) => {
                instance.permissions = permissions || instance.permissions;
                instance.save();
                return instance;
            });
    },

    delete: (id: string): Promise<GroupModel> => {
        return GroupModel.destroy({ where: { id } }).then(handleDaoError('Group not found'));
    },

    getUsers: async (id: string): Promise<UsersFromGroup[]> => {
        try {
            return sequelize.transaction(async (transaction: Transaction) => {
                const group: GroupModel | null = await GroupModel.findByPk(id, { transaction });

                if (!group) {
                    throw Boom.notFound('Group not found');
                }

                return group.getUsers();
            });
        } catch (e) {
            throw Boom.badRequest(e);
        }
    },

    addUsersToGroup: async (id: string, userIds: string[]): Promise<UserGroupModel[]> => {
        try {
            return sequelize.transaction(async (transaction: Transaction) => {
                const group: GroupModel | null = await GroupModel.findByPk(id, { transaction });

                if (!group) {
                    throw Boom.notFound('Group not found');
                }

                const users: UserModel[] = await Promise.all(
                    userIds.map(async (userId: string) => {
                        const user: UserModel | null = await UserModel.findByPk(userId, { transaction });

                        if (!user) {
                            throw Boom.notFound('User not found');
                        }

                        return user;
                    })
                );

                const usersGroups: UserGroupModel[] | undefined = await group.addUser(users, { transaction });

                if (!usersGroups) {
                    throw Boom.conflict(`${group.name} already contains this user/users`);
                }

                return usersGroups;
            });
        } catch (e) {
            throw Boom.badRequest(e);
        }
    }
};
