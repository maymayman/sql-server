import { DataTypes, literal, Model } from "sequelize";
import { ACL, aclDefault } from "@constant/acl";
import { SqlProvider } from "src/provider/sql-provider";

const sqlProvider = new SqlProvider();

const roleModelSchema = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    field: "id",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "name",
  },
  acl: {
    type: DataTypes.JSON,
    allowNull: false,
    field: "acl",
    defaultValue: aclDefault,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: "created_at",
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: "updated_at",
  },
};

class RoleModel extends Model {
  public id: number;
  public name: string;
  public readonly acl: ACL;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

RoleModel.init(roleModelSchema, {
  // Other model options go here
  sequelize: sqlProvider.sequelize(), // We need to pass the connection instance
  tableName: 'role', // We need to choose the table name
});

// RoleModel.hasMany(UserModel, {
//   foreignKey: "role_id",
//   as: DatabaseTables.TABLE_USER
// });


export { RoleModel };
