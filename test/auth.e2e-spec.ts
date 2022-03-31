import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', async () => {
    const testData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: testData.email,
        password: testData.password,
      })
      .expect(201);

    const { id, email } = response.body;
    expect(id).toBeDefined();
    expect(email).toEqual(testData.email);
  });
});
