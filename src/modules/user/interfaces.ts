import { UserModel } from './user-model';

export interface UserServiceInterface {
    select(loginSubstring: string, count?: string): Promise<UserModel[]>;

    getById(id: string): Promise<UserModel>;

    create(body: any): Promise<UserModel>;

    update(id: string, body: any): Promise<UserModel>;

    delete(id: string): Promise<UserModel>;
}
