// import { UserModel } from "./user-model";
// import { RoleModel } from "./role-model";
// import { UserRoleModel } from "./user-role-model";

// RoleModel.sync({ alter: true });
// UserModel.sync({ alter: true });
// UserRoleModel.sync({ alter: true });

// export const models: {
//   [classes: string]: typeof UserModel | 
//   typeof RoleModel | 
//   typeof UserRoleModel;
// } = {
//   'user': UserModel,
//   'role': RoleModel,
//   'user-role': UserRoleModel,
// };

import { DataTypes, Model, ModelAttributes, ModelCtor } from "sequelize";
import { sqlProvider } from "src/provider/sql-provider";
import jsonModels from "./models.json";

type typeofDataType = "BIGINT" | "STRING" | "JSON" | "BOOLEAN";
class SQLModel {
  static dataTypes = {
    "BIGINT": DataTypes.BIGINT,
    "STRING": DataTypes.STRING,
    "JSON": DataTypes.JSON,
    "BOOLEAN": DataTypes.BOOLEAN,
    "INTEGER": DataTypes.INTEGER
  };

  // private models: { [key: string]: ModelCtor<Model<any, any>>; };;
  private sqlProvider;
  private sequelize;
  private jsonSchema: any;
  private isMigrated: boolean = false;
  constructor() {
    this.sqlProvider = sqlProvider;
    this.sequelize = this.sqlProvider.sequelize();
  
    this.initSchemaJson().then(() => {
      this.initialize();
      this.associate();
    });
  }

  private async initSchemaJson(): Promise<void> {
    const schema = {
      metadata: {
        type: DataTypes.JSON,
        allowNull: false,
        field: "metadata",
      }
    };
    this.sequelize.define('Schema', schema, { 
      tableName: 'schema',
      timestamps: true,
      paranoid: true,
    });
    const schemaModel = this.sequelize.models['Schema'];
    await schemaModel.sync({ alter: true });
    let schemaJson = await schemaModel.findOne();
    // @ts-ignore:next-line
    if (!schemaJson || !schemaJson.metadata) {
      schemaJson = await schemaModel.create({ metadata: jsonModels });
    } else {
      this.isMigrated = true;
    }
    // @ts-ignore:next-line
    this.jsonSchema = schemaJson.metadata;
  }

  private initializeSchema(jsonModel: any): ModelAttributes {
    const attributes = jsonModel.attributes;
    const schema: ModelAttributes = {};
  
    for (const key in attributes) {
      const attribute = attributes[key];
      const type = attribute.type as typeofDataType;
      schema[key] = { ...attribute, type: SQLModel.dataTypes[type] };
    }

    return schema;
  }

  private initialize() {
    this.jsonSchema.models.forEach(async (jsonModel: any) => {
      const modelName = jsonModel.name;
      const tableName = jsonModel.table;
      const options = { tableName, timestamps: true, paranoid: true, };
      const schema = this.initializeSchema(jsonModel);
      
      this.sequelize.define(modelName, schema, options );

      if (!this.isMigrated) {
        await this.sequelize.models[jsonModel.name].sync({ alter: true });
      }
    });
    this.isMigrated = true;
  }

  private associate() {
    jsonModels.models.forEach((jsonModel) => {
      const associations = jsonModel.associations;
      if (associations && associations.length) {
        associations.forEach((association) => {
          const type = association.type;
          const model = this.sequelize.models[jsonModel.name];
          const modelReference = this.sequelize.models[association.model]; 
          const foreignKey= association.foreignKey;
          const as = association.as;
  
          // @ts-ignore:next-line
          model[type](modelReference, { foreignKey, as })
        })
      }
    });
  }

  public getModel(name: string): ModelCtor<Model<any, any>> {
    return this.sequelize.models[name];
  }
}

export const models = new SQLModel()
