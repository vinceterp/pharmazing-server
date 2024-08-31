import { getAllVendorsResolver } from "./resolvers.js";
import { Vendor } from "./types.js";
import _ from "lodash";
import { GraphQLList } from "graphql";

const getAllVendors = {
  type: new GraphQLList(Vendor),
  resolve: getAllVendorsResolver,
};

const queries = _.merge({ getAllVendors });

export const vendorQueries = {
  name: "Query",
  fields: queries,
};
