// import { DataTypes, literal, Model } from "sequelize";
// import { ACL, aclDefault } from "@constant/acl";
// import { SqlProvider } from "src/provider/sql-provider";
// import { UserModel } from "./user-model";
// import { RoleModel } from "./role-model";

// const sqlProvider = new SqlProvider();

// const userRoleModelSchema = {
//   id: {
//     type: DataTypes.BIGINT,
//     autoIncrement: true,
//     primaryKey: true,
//     field: "id",
//   },
//   roleId: {
//     allowNull: true,
//     type: DataTypes.BIGINT,
//     field: "role_id",
//     references: {
//       model: "role",
//       key: "id",
//     },
//   },
//   userId: {
//     allowNull: true,
//     type: DataTypes.BIGINT,
//     field: "user_id",
//     references: {
//       model: "user",
//       key: "id",
//     },
//   },
//   acl: {
//     type: DataTypes.JSON,
//     allowNull: false,
//     field: "acl",
//     defaultValue: aclDefault,
//   },
//   createdAt: {
//     allowNull: false,
//     type: DataTypes.DATE,
//     defaultValue: literal('CURRENT_TIMESTAMP'),
//     field: "created_at",
//   },
//   updatedAt: {
//     allowNull: false,
//     type: DataTypes.DATE,
//     defaultValue: literal('CURRENT_TIMESTAMP'),
//     field: "updated_at",
//   },
// };

// class UserRoleModel extends Model {
//   public id: number;
//   public userId: number;
//   public roleId: number;
//   public name: string;
//   public user: UserModel;
//   public role: RoleModel;
//   public readonly acl: ACL;
//   public readonly createdAt: Date;
//   public readonly updatedAt: Date;
// }

// UserRoleModel.init(userRoleModelSchema, {
//   // Other model options go here
//   sequelize: sqlProvider.sequelize(), // We need to pass the connection instance
//   tableName: 'user_role', // We need to choose the table name
// });

// UserRoleModel.belongsTo(RoleModel, {
//   foreignKey: "role_id",
//   as: 'role',
// });

// UserRoleModel.belongsTo(UserModel, {
//   foreignKey: "user_id",
//   as: 'user',
// });

// RoleModel.hasMany(UserRoleModel, {
//   foreignKey: "role_id",
//   as: 'userRoles',
// });

// UserModel.hasMany(UserRoleModel, {
//   foreignKey: "user_id",
//   as: 'userRoles',
// });

// export { UserRoleModel };
