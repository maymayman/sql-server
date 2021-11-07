import { FindOptions, Model, ModelCtor } from "sequelize";

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
    private readonly entityModel: ModelCtor<M>,
  ) {}

  /**
   * Find matching records
   * @param findOptions - Find Options <Model>
   * @param options - Options for the operations
   * @returns A promise of an array of records found
   */
  public async find(findOptions?: FindOptions<M>, options?: any): Promise<M[]> {
    const result = await this.entityModel.findAll(findOptions);

    return result;
  }
}