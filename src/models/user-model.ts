// import { DataTypes, literal, Model } from "sequelize";
// import { ACL, aclDefault } from "@constant/acl";
// import { SqlProvider } from "src/provider/sql-provider";

// const sqlProvider = new SqlProvider();

// const userModelSchema = {
//   id: {
//     type: DataTypes.BIGINT,
//     autoIncrement: true,
//     primaryKey: true,
//     field: "id",
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     field: "email",
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     field: "username",
//   },
//   isVerifiedEmail: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true,
//     field: "is_verified_email",
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     field: "password",
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

// class UserModel extends Model {
//   public id: number;
//   public email: string;
//   public username: string;
//   public isVerifiedEmail: boolean;
//   public password: string;
//   public readonly acl: ACL;
//   public readonly createdAt: Date;
//   public readonly updatedAt: Date;
// };

// UserModel.init(userModelSchema, {
// 	// Other model options go here
// 	sequelize: sqlProvider.sequelize(), // We need to pass the connection instance
// 	tableName: 'user' // We need to choose the table name
// });

// export { UserModel };
