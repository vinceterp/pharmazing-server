import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { User } from "./types.js";
import { signin, getAllUsers } from "./resolvers.js";
import { createSchema } from "graphql-yoga";

const gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      signin: {
        type: new GraphQLNonNull(new GraphQLList(User)),
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: signin,
      },
      getUsers: {
        type: new GraphQLNonNull(new GraphQLList(User)),
        resolve: getAllUsers,
      },
    },
  }),
});

export const schema = createSchema({ typeDefs: gqlSchema });
