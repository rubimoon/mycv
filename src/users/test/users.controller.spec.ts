import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { AuthService } from '../../auth';
import { User } from '../../entities';
import faker from '@faker-js/faker';

const TEST_DATA = {
  id: 1,
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersServices: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockUsersServices = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: TEST_DATA.email,
          password: TEST_DATA.password,
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          {
            id: TEST_DATA.id,
            email,
            password: TEST_DATA.password,
          } as User,
        ]);
      },
      // remove: () => {},
      // update: () => {},
    };
    mockAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersServices,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers(TEST_DATA.email);
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(TEST_DATA.email);
  });

  it('findUsers returns a single user with the given id', async () => {
    const user = await controller.findUser(TEST_DATA.id);
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    mockUsersServices.findOne = () => null;
    await expect(controller.findUser(TEST_DATA.id)).rejects.toThrow();
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      {
        email: TEST_DATA.email,
        password: TEST_DATA.password,
      },
      session,
    );
    expect(user.id).toEqual(TEST_DATA.id);
    expect(session.userId).toEqual(TEST_DATA.id);
  });
});
