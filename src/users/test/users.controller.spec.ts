import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { AuthService } from '../../auth';
import { User } from '../entities';
import { users } from '../../database/seeders/users';

const TEST_DATA = users[0];

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
          { id: TEST_DATA.id, email, password: TEST_DATA.password } as User,
        ]);
      },
      // remove: () => {},
      // update: () => {},
    };
    mockAuthService = {
      // signup: () => {},
      // signin: () => {},
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
});
