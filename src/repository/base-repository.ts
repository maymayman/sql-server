import { FindOptions, Model, ModelCtor, WhereOptions } from "sequelize";
import { models } from "../models";
import isArray from "lodash/isArray";
import isPlainObject from "lodash/isPlainObject";
import { BaseError, ErrorCode } from "@utilities/error";

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;
const MAX_LIMIT = 1000;

export interface ParseQuery {
  where: WhereOptions;
  limit: number;
  offset: number;
  include: ParseInclude[]
};

interface ParseInclude {
  model: ModelCtor<Model<any, any>>;
  as: string;
}
// /**
//    * Create a new record
//    * @param dataObject - The data to be created
//    * @param options - Options for the operations
//    * @returns A promise of record created
//    */
//  create(dataObject: DataObject<T>, options?: Options): Promise<T>;

//  /**
//   * Create all records
//   * @param dataObjects - An array of data to be created
//   * @param options - Options for the operations
//   * @returns A promise of an array of records created
//   */
//  createAll(dataObjects: DataObject<T>[], options?: Options): Promise<T[]>;

//  /**
//   * Find matching records
//   * @param filter - Query filter
//   * @param options - Options for the operations
//   * @returns A promise of an array of records found
//   */
//  find(filter?: Filter<T>, options?: Options): Promise<(T & Relations)[]>;

//  /**
//   * Updating matching records with attributes from the data object
//   * @param dataObject - The data to be updated
//   * @param where - Matching criteria
//   * @param options - Options for the operations
//   * @returns A promise of number of records updated
//   */
//  updateAll(
//    dataObject: DataObject<T>,
//    where?: Where<T>,
//    options?: Options,
//  ): Promise<Count>;

//  /**
//   * Delete matching records
//   * @param where - Matching criteria
//   * @param options - Options for the operations
//   * @returns A promise of number of records deleted
//   */
//  deleteAll(where?: Where<T>, options?: Options): Promise<Count>;

//  /**
//   * Count matching records
//   * @param where - Matching criteria
//   * @param options - Options for the operations
//   * @returns A promise of number of records matched
//   */
//  count(where?: Where<T>, options?: Options): Promise<Count>;

export class BaseRepository<M extends Model<M>> {
  constructor(
    private readonly classModel: ModelCtor<M>,
  ) {}

  private parseIncludes(include: any[]): ParseInclude[] {
    const includes: ParseInclude[] = [];
    if (!isArray(include)) throw new Error(`include Is Not Array`);
    if (!include.length) return []; 
    include.forEach(el => {
      if (!el.model) throw new Error(`No Model Include`);
      const model = models.getModel(el.model);
      if (!model) throw new Error(`Model ${el.model} Not Found`);

      const as = el.as || el.model as string;
      includes.push({ model, as });
    });

    return includes;
  }
  private parseInclude(include: any): ParseInclude[] {
    if (isArray(include)) return this.parseIncludes(include);
    if (isPlainObject(include)) return this.parseIncludes([include]);
    throw new Error(`include Invalid Data`);
  }

  private parseQuery(query: any): ParseQuery {
    const where = query.where ? JSON.parse(query.where as string) : {};
    const limit = query.limit ? Number(query.limit) : undefined;
    const offset = query.limit ? Number(query.offset) : undefined;
    const include = query.include ? JSON.parse(query.include as string) : [];

    return { where, limit, offset, include: this.parseInclude(include) };
  }
  /**
   * Find matching records
   * @param findOptions - Find Options <Model>
   * @param options - Options for the operations
   * @returns A promise of an array of records found
   */
  public async find(query?: any, options?: any): Promise<M[]> {
    const findOptions = this.parseQuery(query);
    const limit = findOptions.limit 
      ? findOptions.limit > MAX_LIMIT ? MAX_LIMIT : findOptions.limit
      : DEFAULT_LIMIT
    const offset = findOptions.offset ? findOptions.offset : DEFAULT_OFFSET
    const result = await this.classModel.findAll({
      ...findOptions,
      limit,
      offset
    });

    return result;
  }

  public async findByPk(id: number, query?: any, options?: any): Promise<M> {
    const findOptions = this.parseQuery(query);
    const result = await this.classModel.findByPk(id, findOptions);

    return result;
  }

  public async create(body: any = {}, options?: any): Promise<M> {
    const ClassModel = this.classModel;
    // @ts-ignore
    const classModel = new ClassModel(body);
    const result = await classModel.save();

    return result;
  }

  public async updateByPk(id: number, body: any = {}, options?: any): Promise<M> {
    const record = await this.findByPk(id);
    if (!record) throw new BaseError(ErrorCode.CLASS_NOT_FOUND);
    const result = await record.set(body).save();

    return result;
  }
}