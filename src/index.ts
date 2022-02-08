import { app } from './app.js';

export const port = process.env['PORT'] || 3000;

app.listen(port, () => {
  console.log(`${process.argv0} listening on port ${port}`);
})