import { GraphQLList } from "graphql";
import { GetAllProductsInput, Product } from "./types.js";
import { getAllProductsResolver } from "./resolvers.js";
import _ from "lodash";

const getAllProducts = {
  type: new GraphQLList(Product),
  args: {
    vendor: {
      type: GetAllProductsInput,
    },
  },
  resolve: getAllProductsResolver,
};

const queries = _.merge({ getAllProducts });

export const productQueries = {
  name: "Query",
  fields: queries,
};
