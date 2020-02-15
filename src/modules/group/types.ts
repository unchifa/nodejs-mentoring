import { UserModel } from '../user/model';
import { UserGroupModel } from '../user-group/model';

export type UsersFromGroup = UserModel & UserGroupModel;
