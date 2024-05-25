import { User } from "./types.js";
import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import {
  signin as signInResolver,
  getAllUsers as getAllUsersResolver,
} from "./resolvers.js";
import _ from "lodash";

const signin = {
  type: User,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: signInResolver,
};

const getAllUsers = {
  type: new GraphQLList(User),
  resolve: getAllUsersResolver,
};

const queries = _.merge({ signin }, { getAllUsers });

export const userQueries = {
  name: "Query",
  fields: queries,
};
