import express from 'express';
import { logger } from './middleware/logger.js';
import { userController } from './controllers/user.js';

export const port = process.env['PORT'] || 3000;
export const app = express();

app.use(express.json());
app.use(logger);

app.use('/users', userController);

app.listen(port, () => {
  console.log(`${process.argv0} listening on port ${port}`);
})