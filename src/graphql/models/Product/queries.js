import { GraphQLList } from "graphql";
import { GetAllProductsInput, Product, GetProductInput } from "./types.js";
import { getAllProductsResolver, getProductResolver } from "./resolvers.js";
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

const getProduct = {
  type: Product,
  args: {
    product: {
      type: GetProductInput,
    },
  },
  resolve: getProductResolver,
};

const queries = _.merge({ getAllProducts }, { getProduct });

export const productQueries = {
  name: "Query",
  fields: queries,
};
