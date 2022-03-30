import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { User, UsersService } from '../../users';

const TEST_DATA = {
  email: 'test@test.com',
  password: 'password',
};

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const usersRepo: User[] = [];

    mockUsersService = {
      find: (email: string) => {
        const filteredUsers = usersRepo.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = { id: Math.random() * 999999, email, password } as User;
        usersRepo.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a sated and hashed password', async () => {
    const user = await service.signup(TEST_DATA.email, TEST_DATA.password);
    expect(user.password).not.toEqual(TEST_DATA.password);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup(TEST_DATA.email, TEST_DATA.password);
    await expect(
      service.signup(TEST_DATA.email, TEST_DATA.password),
    ).rejects.toThrow('email in use');
  });

  it('throws an error if signin is called wth an unused email', async () => {
    await expect(
      service.signin(TEST_DATA.email, TEST_DATA.password),
    ).rejects.toThrow('user not found');
  });

  it('throws error if an invalid password is provided', async () => {
    await service.signup(TEST_DATA.email, TEST_DATA.password);
    await expect(
      service.signin(TEST_DATA.email, TEST_DATA.password + 'abc'),
    ).rejects.toThrow('invalid credential');
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup(TEST_DATA.email, TEST_DATA.password);

    const user = await service.signin(TEST_DATA.email, TEST_DATA.password);
    expect(user).toBeDefined();
  });
});
