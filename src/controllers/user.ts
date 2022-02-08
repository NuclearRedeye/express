import { User } from '../interfaces/user';
import { Router } from 'express';

export const userController = Router();

const users: Map<string, User> = new Map();

function isUser(user: any): boolean {
  return (user.firstName && user.lastName && user.email);
}

userController.get('/', (request, response) => {
  response.sendStatus(501);
});

userController.post('/', (request, response) => {
  response.sendStatus(501);
});

userController.get('/:uuid', (request, response) => {
  response.sendStatus(501);
});

userController.put('/:uuid', (request, response) => {
  response.sendStatus(501);
});

userController.delete('/:uuid', (request, response) => {
  response.sendStatus(501);
});

