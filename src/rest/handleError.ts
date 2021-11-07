
import { NextFunction, Request, Response, Router } from "express";
import { Errors, ErrorCode } from '../utilities/error';
import logger from '@utilities/logger';

export const asyncMiddleware = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    logger.error(error.message, { stack : error.stack });
    const err = (error instanceof Errors) 
      ? error
      : new Errors(
        ErrorCode.INTERNAL_SERVER_ERROR,
        error.message,
      );

    next(error);
  });
};