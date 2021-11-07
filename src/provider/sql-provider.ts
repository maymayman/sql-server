import { QueryOptions, Sequelize, Dialect } from "sequelize";
import logger from "@utilities/logger";
import { ErrorCode, Errors } from "src/utilities/error";

let sequelizeClientInstance: Sequelize;

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
        max: 2, // Maximum rety 3 times
      },
      pool: {
        max: 10,
        min: 5,
        acquire: 60000,
        idle: 60000
      },
      define: {
        underscored: false,
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci"
      },
      logging: console.log
    });
  }
  return sequelizeClientInstance;
};

export class SqlProvider {
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
      throw new Errors(ErrorCode.INTERNAL_SERVER_ERROR);
    }
  }
}