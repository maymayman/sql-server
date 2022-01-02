import * as core from 'express-serve-static-core';
import {Request} from 'express';
import { Model, ModelCtor, WhereOptions } from "sequelize/types";

export interface ParseRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: { id: number };
  startTime: number;
};

export interface ParseQuery {
  where: WhereOptions;
  limit: number;
  offset: number;
};