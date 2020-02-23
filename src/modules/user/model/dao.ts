import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../resources';

const attributes = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true
    }
};

const options = {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    paranoid: true
};

export class UserModel extends Model<UserModel> {
    public readonly id?: string;
    public login!: string;
    public password!: string;
    public age?: number | null;
}

UserModel.init(attributes, options);
