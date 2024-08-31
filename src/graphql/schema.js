import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { createSchema } from "graphql-yoga";
import { userQueries, userMutations } from "./models/User/index.js";
import { addressQueries, addressMutations } from "./models/Address/index.js";
import { vendorQueries, vendorMutations } from "./models/Vendor/index.js";
import _ from "lodash";

const queries = _.merge(userQueries, addressQueries, vendorQueries);
const mutations = _.merge(userMutations, addressMutations, vendorMutations);

const gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType(queries),
  mutation: new GraphQLObjectType(mutations),
});

export const schema = createSchema({ typeDefs: gqlSchema });
