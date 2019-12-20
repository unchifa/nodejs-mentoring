import uuid from 'uuid/v4';

export class UserDTO {
    public readonly id: string;
    public login: string;
    public password: string;
    public age: number;
    public isDeleted: boolean;

    constructor(login: string, password: string, age: number) {
        this.id = uuid();
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = false;
    }
}