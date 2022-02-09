import { User } from '../interfaces/user';

import { randomUUID } from 'crypto';
import { Router } from 'express';

export const userController = Router();

const users: Map<string, User> = new Map();

function isUser(user: any): boolean {
  return (user.firstName && user.lastName && user.email) ? true : false;
}

userController.get('/', (request, response) => {
  const payload = [];
  for (const [key, value] of users.entries()) {
    payload.push({uuid: key, ...value});
  }
  response.status(200).json(payload);
});

userController.post('/', (request, response) => {
  const payload = request.body;
  if (isUser(payload) === false) {
    response.sendStatus(400);
    return;
  }

  const userId = randomUUID();
  users.set(userId, payload);
  response.status(201).json({uuid: userId, ...payload});
});

userController.get('/:uuid', (request, response) => {
  const uuid = request.params.uuid;
  if (users.has(uuid) === false) {
    response.sendStatus(404);
    return;
  }

  response.status(200).json({uuid, ...users.get(uuid)});
});

userController.put('/:uuid', (request, response) => {
  const uuid = request.params.uuid;
  if (users.has(uuid)) {
    response.sendStatus(409);
    return;
  }

  const payload = request.body;
  if (isUser(payload) === false) {
    response.sendStatus(400);
    return;
  }

  users.set(uuid, payload);
  response.status(201).json({uuid, ...payload});
});

userController.patch('/:uuid', (request, response) => {
  const uuid = request.params.uuid;
  if (users.has(uuid) === false) {
    response.sendStatus(404);
    return;
  }

  const patched = {...users.get(uuid), ...request.body};
  if (!isUser(patched)) {
    response.sendStatus(400);
    return;
  }

  users.set(uuid, patched);
  response.status(200).json({uuid, ...patched});
});

userController.delete('/:uuid', (request, response) => {
  const uuid = request.params.uuid;
  if (users.has(uuid) === false) {
    response.sendStatus(404);
    return;
  }

  users.delete(uuid);
  response.sendStatus(204);
});
