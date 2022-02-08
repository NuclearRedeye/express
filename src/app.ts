import express from 'express';
import { logger } from './middleware/logger.js';
import { userController } from './controllers/user.js';

export const app = express();

app.use(express.json());
app.use(logger);

app.use('/users', userController);