import { pickBy } from 'lodash';
import { UserServiceInterface } from './interfaces';
import { BodyType, UserModelType } from './types';
import { UserModel } from './user-model';
import { handleDaoError, prepareLimit, prepareLogin } from '../../utils';

export class UserService implements UserServiceInterface {
    private readonly userModel: UserModelType;

    constructor(userModel: UserModelType) {
        this.userModel = userModel;
    }

    public select = (loginSubstring?: string, count?: string): Promise<UserModel[]> => {
        const login = prepareLogin(loginSubstring);
        const limit = prepareLimit(count);

        const where = pickBy({ isDeleted: false, login });
        const options = pickBy({ where, limit, raw: true });

        return this.userModel.findAll(options);
    };

    public getById = (id: string): Promise<UserModel> => {
        return this.userModel.findByPk(id).then(handleDaoError('User not found'));
    };

    public create = ({ login, password, age }: BodyType): Promise<UserModel> => {
        return this.userModel.create({ login, password, age }).then(handleDaoError('Missing required parameters'));
    };

    public update = (id: string, body: BodyType): Promise<UserModel> => {
        return this.userModel.update(pickBy(body), { where: { id } }).then(handleDaoError('User not found'));
    };

    public delete = (id: string): Promise<UserModel> => {
        return this.userModel.update({ isDelete: true }, { where: { id } }).then(handleDaoError('User not found'));
    };
}
