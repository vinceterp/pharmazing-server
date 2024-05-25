import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { createSchema } from "graphql-yoga";
import { userQueries, userMutations } from "./models/User/index.js";
import _ from "lodash";

const queries = _.merge(userQueries);
const mutations = _.merge(userMutations);

const gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType(queries),
  mutation: new GraphQLObjectType(mutations),
});

export const schema = createSchema({ typeDefs: gqlSchema });
