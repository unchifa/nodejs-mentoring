import { UserController } from './controller';
import { UserService } from './service';

const mockUser1 = { id: '1', login: 'test 1' };
const mockUser2 = { id: '2', login: 'test 2' };
const mockUser3 = { id: '3', login: 'test 3' };
const mockUsers = [mockUser1, mockUser2, mockUser3];

jest.mock('./service', () => ({
    UserService: {
        select: jest.fn(() => mockUsers),
        getById: jest.fn(() => mockUser1),
        create: jest.fn(() => mockUser1),
        update: jest.fn(() => mockUser1),
        delete: jest.fn()
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

describe('UserController', () => {
    it('should find users via UserService and put result to the response', async () => {
        const login = 'test';
        const limit = '10';

        await UserController.get({ ...req, query: { login, limit } }, res, next);

        expect(UserService.select).toBeCalledWith(login, limit);
        expect(res.json).toBeCalledWith(mockUsers);
    });

    it('should find a user by id via UserService and put result to the response', async () => {
        const id = '1';

        await UserController.getById({ ...req, params: { id } }, res, next);

        expect(UserService.getById).toBeCalledWith(id);
        expect(res.json).toBeCalledWith(mockUser1);
    });

    it('should create user via UserService and put correct status to the response', async () => {
        const user = { login: 'test 1', password: 'qwerty123', age: 22 };

        await UserController.create({ ...req, body: user }, res, next);

        expect(UserService.create).toBeCalledWith(user);
        expect(res.status).toBeCalledWith(201);
    });

    it('should delete user via UserService and put correct status to the response', async () => {
        const id = '1';

        await UserController.delete({ ...req, params: { id } }, res, next);

        expect(UserService.delete).toBeCalledWith(id);
        expect(res.status).toBeCalledWith(200);
    });
});
