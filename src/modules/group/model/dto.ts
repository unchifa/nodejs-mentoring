import uuidv4 from 'uuid/v4';
import { Permission } from '../constants';

export class GroupDTO {
    public readonly id?: string;
    public name: string;
    public permissions: Permission[];

    constructor(name: string, permissions: Permission[]) {
        this.id = uuidv4();
        this.name = name;
        this.permissions = permissions;
    }
}
