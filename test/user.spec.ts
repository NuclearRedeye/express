
import { app } from '../src/app';
import { default as request } from 'supertest';

describe('User Controller', () => {
  it('GET /users returns all users', async () => {
    const res = await request(app).get('/users');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toEqual({});
  });
});