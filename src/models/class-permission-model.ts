// import { DataTypes, Model } from "sequelize";
// import { SqlProvider } from "src/provider/sql-provider";
// import { PCL, pclDefault } from "src/constant/pcl";

// const sqlProvider = new SqlProvider();

// const userModelSchema = {
//   id: {
//     type: DataTypes.BIGINT,
//     autoIncrement: true,
//     primaryKey: true,
//     field: "id",
//   },
//   class: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false,
//     field: "class",
//   },
//   permission: {
//     type: DataTypes.JSON,
//     allowNull: false,
//     field: "schema",
//     defaultValue: pclDefault
//   },
//   createdAt: {
//     allowNull: false,
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     field: "created_at",
//   },
//   updatedAt: {
//     allowNull: false,
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     field: "updated_at",
//   },
// };

// class UserModel extends Model {
//   public id: number;
//   public class: string;
//   public permission: PCL;
//   public readonly createdAt: Date;
//   public readonly updatedAt: Date;
// };

// UserModel.init(userModelSchema, {
// 	// Other model options go here
// 	sequelize: sqlProvider.sequelize(), // We need to pass the connection instance
// 	tableName: 'user' // We need to choose the table name
// });

// export { UserModel };
