import { GroupModel, GroupDTO } from './model';
import { createSequelizeFindOptions } from '../../utils';
import { Permission } from './constants';
import { UserGroupModel } from '../user-group/model';
import { UsersFromGroup } from './types';
import { GroupRepository } from './data-access';

export const GroupService = {
    select: (nameSubstring?: string, limit?: string): Promise<GroupModel[]> => {
        const options = createSequelizeFindOptions({ name: nameSubstring }, limit);
        return GroupRepository.select(options);
    },

    getById: (id: string): Promise<GroupModel> => {
        return GroupRepository.getById(id);
    },

    create: async ({ name, permissions }: GroupDTO): Promise<GroupModel> => {
        const dto: GroupDTO = new GroupDTO(name, permissions);
        return GroupRepository.create(dto);
    },

    update: (id: string, permissions: Permission[]): Promise<GroupModel> => {
        return GroupRepository.update(id, permissions);
    },

    delete: (id: string): Promise<GroupModel> => {
        return GroupRepository.delete(id);
    },

    getUsers: (id: string): Promise<UsersFromGroup[]> => {
        return GroupRepository.getUsers(id);
    },

    addUsersToGroup: (id: string, userIds: string[]): Promise<UserGroupModel[]> => {
        return GroupRepository.addUsersToGroup(id, userIds);
    }
};
