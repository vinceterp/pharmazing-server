import { Address } from "./types.js";
import _ from "lodash";
import { createAddressResolver, editAddressResolver } from "./resolvers.js";
import { CreateAddressInputType, EditAddressInput } from "./types.js";
import { GraphQLNonNull, GraphQLString } from "graphql";

const createAddress = {
  type: Address,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: CreateAddressInputType },
  },
  resolve: (parent, args) => createAddressResolver(true, true, parent, args),
};

const editAddress = {
  type: Address,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: EditAddressInput },
  },
  resolve: editAddressResolver,
};

const mutations = _.merge({ createAddress }, { editAddress });

export const addressMutations = {
  name: "Mutation",
  fields: mutations,
};
