import { User } from "./types.js";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { createUser as createUserResolver } from "./resolvers.js";
import _ from "lodash";

const createUser = {
  type: User,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    addressLine1: { type: GraphQLString },
    addressLine2: { type: GraphQLString },
    city: { type: GraphQLString },
    parish: { type: GraphQLString },
    country: { type: GraphQLString },
    zip: { type: GraphQLString },
  },
  resolve: createUserResolver,
};

const mutations = _.merge({ createUser });

export const userMutations = {
  name: "Mutation",
  fields: mutations,
};
