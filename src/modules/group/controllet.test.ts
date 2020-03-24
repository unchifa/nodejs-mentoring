import { GroupController } from './controller';
import { GroupService } from './service';

const mockUser1 = { id: '1', login: 'test 1' };
const mockUsers = [mockUser1];
const mockGroup1 = { id: '1', name: 'test 1' };
const mockGroup2 = { id: '2', name: 'test 2' };
const mockGroup3 = { id: '3', name: 'test 3' };
const mockGroups = [mockGroup1, mockGroup2, mockGroup3];

jest.mock('./service', () => ({
    GroupService: {
        select: jest.fn(() => mockGroups),
        getById: jest.fn(() => mockGroup1),
        create: jest.fn(() => mockGroup1),
        update: jest.fn(() => mockGroup1),
        delete: jest.fn(),
        getUsers: jest.fn(() => mockUsers),
        addUsersToGroup: jest.fn()
    }
}));

const req: any = {};
const res: any = {
    json: jest.fn(),
    status: jest.fn()
};
const next = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe('GroupController', () => {
    const id = '1';

    it('should find groups via GroupService and put result to the response', async () => {
        const name = 'test';
        const limit = '10';

        await GroupController.get({ ...req, query: { name, limit } }, res, next);

        expect(GroupService.select).toBeCalledWith(name, limit);
        expect(res.json).toBeCalledWith(mockGroups);
    });

    it('should find a group by id via GroupService and put result to the response', async () => {
        await GroupController.getById({ ...req, params: { id } }, res, next);

        expect(GroupService.getById).toBeCalledWith(id);
        expect(res.json).toBeCalledWith(mockGroup1);
    });

    it('should create group via GroupService and put correct status to the response', async () => {
        const group = { name: 'test 1', permissions: ['READ'] };

        await GroupController.create({ ...req, body: group }, res, next);

        expect(GroupService.create).toBeCalledWith(group);
        expect(res.status).toBeCalledWith(201);
    });

    it('should delete group via GroupService and put correct status to the response', async () => {
        await GroupController.delete({ ...req, params: { id } }, res, next);

        expect(GroupService.delete).toBeCalledWith(id);
        expect(res.status).toBeCalledWith(200);
    });

    it('should get users via GroupService and put result to the response', async () => {
        await GroupController.getUsers({ ...req, params: { id } }, res, next);

        expect(GroupService.getUsers).toBeCalledWith(id);
        expect(res.json).toBeCalledWith(mockUsers);
    });

    it('should add users to a group via GroupService and put correct status to the response', async () => {
        const userIds = ['1', '2'];

        await GroupController.addUsersToGroup({ ...req, params: { id }, body: { userIds } }, res, next);

        expect(GroupService.addUsersToGroup).toBeCalledWith(id, userIds);
        expect(res.status).toBeCalledWith(200);
    });
});
