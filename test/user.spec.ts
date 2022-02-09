
import { app } from '../src/app';
import { default as request } from 'supertest';

describe('User Controller', () => {

  const testUser = {
    firstName: 'Joe',
    lastName: 'Bloggs',
    email: 'joe.bloggs@example.com'
  }

  it('GET /users returns all users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({});
  });
  
  it('GET /users/:userid returns an error if the specified user does not exist', async () => {
    const res = await request(app).get('/users/1');
    expect(res.status).toEqual(404);
  });

  it('POST /users creates a new user', async () => {
    const res = await request(app).post('/users').send({testUser});
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({id: '1', ...testUser});
  });

  it('GET /users/:userid returns the specified user', async () => {
    const res = await request(app).get('/users/1');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({id: '1', ...testUser});
  });

  it('PUT /users/:userid creates a new user with a specific id', async () => {
    const res = await request(app).put('/users/2').send({testUser});
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({id: '2', ...testUser});
  });

  it('PUT /users/:userid fails to create a user that already exists', async () => {
    const res = await request(app).put('/users/2').send({testUser});
    expect(res.status).toEqual(409);
  });

  it('PATCH /users/:userid updates a user', async () => {
    const patchedUser = {...testUser, firstName: 'Jane'};
    const res = await request(app).patch('/users/1').send({firstName: 'Jane'});
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({id: '1', ...patchedUser});
  });

  it('DELETE /users/:userid deletes a user', async () => {
    const res = await request(app).delete('/users/2');
    expect(res.status).toEqual(204);
  });
});