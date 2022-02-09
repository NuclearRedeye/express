
import { randomUUID } from 'crypto';
import { app } from '../src/app';
import { default as request } from 'supertest';

describe('User Controller', () => {

  const uuid = randomUUID();

  const testUser = {
    firstName: 'Unit',
    lastName: 'Test',
    email: 'unit.test@example.com'
  }

  it('POST /users creates a new user', async () => {
    const response = await request(app).post('/users').send(testUser);
    expect(response.status).toEqual(201);
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toEqual(expect.objectContaining(testUser));
  });

  it('POST /users fails with invalid payload', async () => {
    const response = await request(app).post('/users').send({"firstName": "Jane"});
    expect(response.status).toEqual(400);
  });

  it('PUT /users/:uuid creates a new user with a specific id', async () => {
    const response = await request(app).put(`/users/${uuid}`).send(testUser);
    expect(response.status).toEqual(201);
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toEqual({uuid, ...testUser});
  });

  it('PUT /users/:uuid fails if the user already exists', async () => {
    const response = await request(app).put(`/users/${uuid}`).send(testUser);
    expect(response.status).toEqual(409);
  });

  it('PUT /users/:uuid fails with invalid payload', async () => {
    const response = await request(app).put(`/users/${randomUUID()}`).send({firstName: "Jane"});
    expect(response.status).toEqual(400);
  });

  it('GET /users returns all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toEqual(expect.arrayContaining([{uuid, ...testUser}]));
  });
  
  it('GET /users/:uuid returns the specified user', async () => {
    const response = await request(app).get(`/users/${uuid}`);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toEqual({uuid, ...testUser});
  });

  it('GET /users/:uuid returns an error if the specified user does not exist', async () => {
    const response = await request(app).get(`/users/${randomUUID()}`);
    expect(response.status).toEqual(404);
  });

  it('PATCH /users/:uuid partially updates a user', async () => {
    const patchedUser = {...testUser, firstName: 'Jane'};
    const response = await request(app).patch(`/users/${uuid}`).send({firstName: 'Jane'});
    expect(response.status).toEqual(200);
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toEqual({uuid, ...patchedUser});
  });

  it('PATCH /users/:uuid fully updates a user', async () => {
    const patchedUser = {firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com'};
    const response = await request(app).patch(`/users/${uuid}`).send(patchedUser);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toEqual({uuid, ...patchedUser});
  });

  it('DELETE /users/:uuid deletes a user', async () => {
    const response = await request(app).delete(`/users/${uuid}`);
    expect(response.status).toEqual(204);
  });

  it('DELETE /users/:uuid fails if the user does not exist', async () => {
    const response = await request(app).delete(`/users/${uuid}`);
    expect(response.status).toEqual(404);
  });
});