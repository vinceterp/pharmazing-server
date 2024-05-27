import { Address } from "./types.js";
import _ from "lodash";
import { createAddressResolver } from "./resolvers.js";
import { CreateAddressInputType } from "./types.js";
import { GraphQLNonNull, GraphQLString } from "graphql";

const createAddress = {
  type: Address,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: CreateAddressInputType },
  },
  resolve: (parent, args) => createAddressResolver(true, true, parent, args),
};

const mutations = _.merge({ createAddress });

export const addressMutations = {
  name: "Mutation",
  fields: mutations,
};
