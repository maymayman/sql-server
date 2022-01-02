
import { NextFunction, Request, Response, Router } from "express";
import { BaseError, ErrorCode } from '@utilities/error';
import { models } from "@models/index";
import { logger } from '@utilities/logger';
import { ParseRequest } from "./interface";
class ErrorHandler {
  public async handleError(
    req: ParseRequest, 
    res: Response, 
    err: any
  ): Promise<Response<any, Record<string, any>>> {
    const trace = {
      userId: req.user?.id,
      method: req.method,
      endpoint: req.originalUrl,
      params: req.method === 'GET' ? req.query : req.body,
      reason: err.message,
      stack : err.stack,
      status: err.status || 500,
      headers: req.headers,
      clientIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      timeResponse: (new Date()).getTime() - req.startTime,
    }
   
    logger.error(`Error`, trace);
    const traceLog = models.getModel('TraceLog');
    traceLog.create(trace);
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
    res.status(err.status || 500);
    return res.json({ message: err.message, code: err.code });
  }

  public asyncMiddleware = (fn: Function) => (
    req: ParseRequest,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
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