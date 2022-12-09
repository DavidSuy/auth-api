'use strict';

require('dotenv').config();
const { db } = require('../src/models');
const server = require('../src/server');

const { users } = require('../src/models');

beforeAll(async () => {
  await db.sync().then(() => {
    server.start(3001);
  });
});
afterAll(async () => {
  await db.drop();
  server.close();
});

describe('Testing user model', () => {
  test('User model can create a token', async () => {
    const user = await users.create({
      username: 'Test',
      password: 'Test',
    });

    console.log(user.token);
    expect(user.username).toEqual('Test');
    expect(user.token).toBeTruthy();
    expect(user.role).toEqual('user');
    expect(user.capabilities[0]).toEqual('read');
  });
});
