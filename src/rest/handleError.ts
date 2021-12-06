
import { NextFunction, Request, Response, Router } from "express";
import { BaseError, ErrorCode } from '@utilities/error';
import { logger } from '@utilities/logger';

class ErrorHandler {
  private async handleError(req: Request, res: Response, err: any): Promise<void> {
    const method = req.method;
    const baseUrl = req.baseUrl;
    const input = method === 'get' ? req.query : req.body;
    logger.error(`Error ${err.message}`, { method, baseUrl, input, stack : err.stack });
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
  }

  public asyncMiddleware = (fn: Function) => (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
      logger.error(error.message, { stack : error.stack });
      this.handleError(req, res, error);
      const err = (error instanceof BaseError) 
        ? error
        : new BaseError(
          ErrorCode.INTERNAL_SERVER_ERROR,
          error.message,
        );
  
      next(err);
    });
  }
}

export const errorHandler = new ErrorHandler();

// export const asyncMiddleware = (fn: Function) => (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   Promise.resolve(fn(req, res, next)).catch(error => {
//     logger.error(error.message, { stack : error.stack });
//     const err = (error instanceof BaseError) 
//       ? error
//       : new BaseError(
//         ErrorCode.INTERNAL_SERVER_ERROR,
//         error.message,
//       );

//     next(error);
//   });
// };