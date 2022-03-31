import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

global.beforeEach(async () => {
  const testDb = '../test.sqlite';
  if (existsSync(testDb)) {
    await rm(join(__dirname, '..', 'test.sqlite'));
  }
});

global.afterEach(async () => {
  const conn = getConnection();
  if (conn) {
    await conn.close();
  }
});
