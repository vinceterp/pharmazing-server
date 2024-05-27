import _ from "lodash";
import { Address } from "./types.js";
import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { addressQueryResolver } from "./resolvers.js";

const getUserAddress = {
  type: new GraphQLList(new GraphQLNonNull(Address)),
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (parent, args) => addressQueryResolver(true, parent, args),
};

const queries = _.merge({ getUserAddress });

export const addressQueries = {
  name: "Query",
  fields: queries,
};
