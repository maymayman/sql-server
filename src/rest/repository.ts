import * as core from 'express-serve-static-core';
import { Model, ModelCtor, WhereOptions } from "sequelize/types";
import { BaseRepository } from "src/repository/base-repository";

export class RestRepository<M extends Model<M, M>> extends BaseRepository<M> {
  constructor(
    entityModel: ModelCtor<M>
  ) {
    super(entityModel);
  }

  public async find(query: core.Query, options: any = {}): Promise<M[]> {
    return super.find(query, options);
  }

  public async findByPk(id: number, query: core.Query, options: any = {}): Promise<M> {
    return super.findByPk(id, query, options);
  }

  public async create(body: any, options: any = {}): Promise<M> {
    return super.create(body, options);
  }

  public async updateByPk(id: number, body: any, options: any = {}): Promise<M> {
    return super.updateByPk(id, body, options);
  }
}