import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../resources';
import { UserModel } from '../../user/model';
import { GroupModel } from '../../group/model';

const attributes = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    groupId: {
        type: DataTypes.UUID,
        references: {
            model: GroupModel,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: UserModel,
            key: 'id'
        }
    }
};

const options = {
    sequelize,
    modelName: 'userGroup',
    tableName: 'usersGroups'
};

export class UserGroupModel extends Model<UserGroupModel> {
    public readonly id?: string;
    public readonly groupId!: string;
    public readonly userId!: string;
}

UserGroupModel.init(attributes, options);

UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'userId', onDelete: 'cascade' });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'groupId', onDelete: 'cascade' });
