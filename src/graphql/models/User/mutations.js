import { User } from "./types.js";
import {
  createUser as createUserResolver,
  deleteUser as deleteUserResolver,
  editUser as editUserResolver,
} from "./resolvers.js";
import {
  CreateUserInputType,
  EditUserInputType,
  DeleteUserInputType,
} from "./types.js";
import _ from "lodash";

const createUser = {
  type: User,
  args: { user: { type: CreateUserInputType } },
  resolve: createUserResolver,
};

const editUser = {
  type: User,
  args: { user: { type: EditUserInputType } },
  resolve: editUserResolver,
};

const deleteUser = {
  type: User,
  args: { user: { type: DeleteUserInputType } },
  resolve: deleteUserResolver,
};

const mutations = _.merge({ createUser }, { editUser }, { deleteUser });

export const userMutations = {
  name: "Mutation",
  fields: mutations,
};
