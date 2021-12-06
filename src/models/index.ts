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

const dataTypes = {
  "BIGINT": DataTypes.BIGINT,
  "STRING": DataTypes.STRING,
  "JSON": DataTypes.JSON,
  "BOOLEAN": DataTypes.BOOLEAN,
};

// const models: { [key: string]: ModelCtor<Model<any, any>>; } = {};

// jsonModels.models.forEach((jsonModel) => {
//   const attributes = jsonModel.attributes;
//   const schema = {};

//   for (const key in attributes) {
//     // @ts-ignore:next-line
//     const attribute = attributes[key];
//     const type = attribute.type;
//     // @ts-ignore:next-line
//     schema[key] = { ...attribute, type: dataTypes[type] };
//   }
//   sequelize.define(
//     jsonModel.name, 
//     schema,
//     {
//       tableName: jsonModel.table,
//       timestamps: true,
//     }
//   );

//   sequelize.models[jsonModel.name].sync({ alter: true });
//   models[jsonModel.endpoint] = sequelize.models[jsonModel.name];
// });

type typeofDataType = "BIGINT" | "STRING" | "JSON" | "BOOLEAN";
class SQLModel {
  static dataTypes = {
    "BIGINT": DataTypes.BIGINT,
    "STRING": DataTypes.STRING,
    "JSON": DataTypes.JSON,
    "BOOLEAN": DataTypes.BOOLEAN,
  };

  private models: { [key: string]: ModelCtor<Model<any, any>>; };;
  private sqlProvider;
  private sequelize;
  constructor() {
    this.sqlProvider = sqlProvider;
    this.sequelize = this.sqlProvider.sequelize();
    this.models = {};
    this.initialize();
    this.associate()
  }

  private initializeSchema(jsonModel: any): ModelAttributes {
    const attributes = jsonModel.attributes;
    const schema: ModelAttributes = {};
  
    for (const key in attributes) {
      const attribute = attributes[key];
      const type = attribute.type as typeofDataType;
      schema[key] = { ...attribute, type: dataTypes[type] };
    }

    return schema;
  }

  private initialize() {
    jsonModels.models.forEach((jsonModel) => {
      const modelName = jsonModel.name;
      const tableName = jsonModel.table;
      const options = { tableName, timestamps: true, };
      const schema = this.initializeSchema(jsonModel);
      
      this.sequelize.define(modelName, schema, options );
      // this.models[jsonModel.endpoint] = this.sequelize.models[jsonModel.name];

      // this.sequelize.models[jsonModel.name].sync({ alter: true });
    });
  }

  private associate() {
    jsonModels.models.forEach((jsonModel) => {
      const associations = jsonModel.associations;
      associations.forEach((association) => {
        const type = association.type;
        const model = this.sequelize.models[jsonModel.name];
        const modelReference = this.sequelize.models[association.model]; 
        const foreignKey= association.foreignKey;
        const as = association.as;

        // @ts-ignore:next-line
        model[type](modelReference, { foreignKey, as })
      })

    });
  }

  public getModel(name: string): ModelCtor<Model<any, any>> {
    return this.sequelize.models[name];
  }
}

export const models = new SQLModel()
