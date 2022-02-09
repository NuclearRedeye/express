import { app } from './app.js';

export const port = process.env['PORT'] || 80;

const server = app.listen(port, () => {
  console.log(`${process.argv0} listening on port ${port}`);

  process.on('SIGINT', function () {
    server.close(function () {
      process.exit(0);
    });
  });
})