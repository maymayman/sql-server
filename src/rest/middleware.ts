import {NextFunction, Response} from 'express';
import { ParseRequest } from './interface';

class AuthenticationMiddleware {
  constructor(){
    this.identifyUser = this.identifyUser.bind(this);
  }

  public async identifyUser(
    req: ParseRequest,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const headers = req.headers;
      const authorization = headers.authorization;
      if (!authorization) return next();
      const [bear, token] = authorization.split(' ');
      // const user = await this.authenticationService.verifyTokenAuthorization(token);
   
      // if (!user) throw new UnauthorizedError()
      // req.user = user;

      return next();
    } catch (error) {
      return next(error)
    }
  }
}

class CommonMiddleware {
  constructor(){
    this.customRequestParams = this.customRequestParams.bind(this);
  }

  public async customRequestParams(
    req: ParseRequest,
    _res: Response,
    next: NextFunction,
  ) {
    req.startTime = new Date();
    return next();
  }
}

export class GlobalMiddleware {
  private middlewares: any[];
  private commonMiddleware: CommonMiddleware;
  private authenticationMiddleware: AuthenticationMiddleware;
  constructor(
    
  ) {
    this.commonMiddleware = new CommonMiddleware();
    this.authenticationMiddleware = new AuthenticationMiddleware();
    this.middlewares = [];
  }

  public getGlobalMiddlewares() {
    this.middlewares.push(this.commonMiddleware.customRequestParams);
    this.middlewares.push(this.authenticationMiddleware.identifyUser);
    return this.middlewares;
  }
}
