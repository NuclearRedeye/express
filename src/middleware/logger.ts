import type {Request, Response, NextFunction} from 'express';

export function logger(request: Request, response: Response, next: NextFunction): void {
  console.log(`Handling new '${request.method}' request from '${request.hostname}'`);
  next();
};
