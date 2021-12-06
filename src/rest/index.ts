import cors from "cors";
import express from "express";
import { ErrorCode, BaseError } from "@utilities/error";
import { logger } from "@utilities/logger";
import {router as api} from './api';
import { GlobalMiddleware } from "./middleware";

export class App {
  private app: express.Application;
  private globalMiddleware: GlobalMiddleware;

  constructor() {
    this.globalMiddleware = new GlobalMiddleware();
    this.app = express();
    this.config();
    this.globalMiddlewares();
    this.routes();
    this.handleError();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    const options: cors.CorsOptions = {
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Authorization",
      ],
      credentials: true,
      methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "*",
      preflightContinue: false,
    };

    // use cors middleware
    this.app.use(cors(options));
  }

  private globalMiddlewares(): void {
    const globalMiddlewares = this.globalMiddleware.getGlobalMiddlewares();
    this.app.use(globalMiddlewares);
  }
  private routes(): void {
    
    this.app.get("/health", (
      req: express.Request,
      res: express.Response
    ) => res.send('success'));

    this.app.use("/api", api);
  }

  private handleError(): void {
    // catch 404 and forward to error handler
    this.app.use(
      (
        _req: express.Request,
        _res: express.Response,
        next: express.NextFunction
      ) => next(new BaseError(ErrorCode.API_NOT_FOUND))
    );
    // error handler
    this.app.use(
      (
        err: BaseError,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
      ) => {
        logger.error(err.message);
        // set locals, only providing error in development
        // res.locals.message = err.message;
        // res.locals.error = err;

        // render the error page
        res.status(err.status || 500);
        res.json({ message: err.message, code: err.code });
      }
    );
  }

  public getApplication(): express.Application {
    return this.app;
  }
}