import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../resources';
import { Permission } from '../constants';
import { UserModel } from '../../user/model';
import { UserGroupModel } from '../../user-group/model';
import { UsersFromGroup } from '../types';

const attributes = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
};

const options = { sequelize, modelName: 'group', tableName: 'groups' };

export class GroupModel extends Model<GroupModel> {
    public readonly id?: string;
    public name!: string;
    public permissions!: Permission[];

    public getUsers!: () => UsersFromGroup[];
    public addUser!: (users: UserModel[] | UserModel, options: Object) => UserGroupModel[];
}

GroupModel.init(attributes, options);
