import { QueryOptions, Sequelize, Dialect, Op } from "sequelize";
import { logger } from "@utilities/logger";
import { ErrorCode, BaseError } from "src/utilities/error";

let sequelizeClientInstance: Sequelize;

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};
const sequelizeInstance = ({
  dialect,
  db,
  user,
  password,
  host,
  port,
}:{
  dialect: Dialect,
  db: string,
  user: string,
  password: string,
  host: string,
  port: number
}): Sequelize => {
  if (!sequelizeClientInstance) {
    sequelizeClientInstance = new Sequelize(db, user, password, {
      port,
      host,
      dialect,
      retry: {
        match: [/Deadlock/i],
        max: 3, // Maximum rety 3 times
      },
      pool: {
        max: 10,
        min: 5,
        acquire: 60000,
        idle: 60000
      },
      define: {
        underscored: true,
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci"
      },
      operatorsAliases: operatorsAliases,
      logging: process.env.NODE_ENV === 'production'
        ? false
        : console.log
    });
  }
  return sequelizeClientInstance;
};

class SqlProvider {
  private readonly sequelizeClient: Sequelize;
  private readonly region: string = process.env.DB_REGION;
  private readonly dialect: Dialect = process.env.DB_DIALECT as Dialect|| "mysql";
  private readonly host: string = process.env.DB_HOST || "localhost";
  private readonly port: number = Number(process.env.DB_PORT) || 3307;
  private readonly user: string = process.env.DB_USER || "root";
  private readonly password: string = process.env.DB_PASS || "123123";
  private readonly db: string = process.env.DB_NAME || "sql-dev";

  constructor() {
    try {
      this.sequelizeClient = sequelizeInstance({
        dialect: this.dialect,
        db: this.db,
        user: this.user,
        password: this.password,
        host: this.host,
        port: this.port,
      });
    } catch (err) {
      logger.error("error-sequelize:", err);
    }
  }

  public sequelize(): Sequelize {
    return this.sequelizeClient;
  }

  public async sequelizeClose(): Promise<void> {
    return this.sequelizeClient.close();
  }

  public async query(
    sql: string,
    options?: QueryOptions
  ): Promise<{ results: any }> {
    try {
      const [results] = await this.sequelizeClient.query(sql, options);
      const response = { results };
      return response;
    } catch (errors) {
      logger.error("errors-query:", errors);
      throw new BaseError(ErrorCode.INTERNAL_SERVER_ERROR);
    }
  }
}

export const sqlProvider = new SqlProvider();
