import { GraphQLString, GraphQLNonNull } from "graphql";
import { Cart } from "./types.js";
// import { createCartResolver } from './resolvers.js';
import _ from "lodash";
import { cartQueryResolver } from "./resolvers.js";

const getCart = {
  type: Cart,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: cartQueryResolver,
};

const queries = _.merge({ getCart });

export const cartQueries = {
  name: "Query",
  fields: queries,
};
