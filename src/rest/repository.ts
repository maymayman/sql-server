import * as core from 'express-serve-static-core';
import { Model, ModelCtor, WhereOptions } from "sequelize/types";
import { BaseRepository } from "src/repository/base-repository";
import { ParseQuery } from './interface';

export class RestRepository<M extends Model<M, M>> extends BaseRepository<M> {
  constructor(
    entityModel: ModelCtor<M>
  ) {
    super(entityModel);
  }

  static parseQuery(query: core.Query): ParseQuery {
    const where = query.where ? JSON.parse(query.where as string) : {};
    const limit = query.limit ? Number(query.limit) : undefined;
    const offset = query.limit ? Number(query.offset) : undefined;

    return { where, limit, offset };
  }
  public async find(findOptions: any = {}, options: any = {}): Promise<M[]> {
    return super.find(findOptions, options);
  }
}