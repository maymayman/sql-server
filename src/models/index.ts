import { UserModel } from "./user-model";
import { RoleModel } from "./role-model";
import { UserRoleModel } from "./user-role-model";

// RoleModel.sync({ alter: true });
// UserModel.sync({ alter: true });
// UserRoleModel.sync({ alter: true });

export const models: {
  [classes: string]: typeof UserModel | 
  typeof RoleModel | 
  typeof UserRoleModel;
} = {
  'user': UserModel,
  'role': RoleModel,
  'user-role': UserRoleModel,
};
