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

  public async find(query: core.Query, options: any = {}): Promise<M[]> {
    return super.find(query, options);
  }
}