import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { User } from "./types.js";
import { signin, getAllUsers, createUserResolver } from "./resolvers.js";
import { createSchema } from "graphql-yoga";

const gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      signin: {
        type: User,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: signin,
      },
      getAllUsers: {
        type: new GraphQLList(User),
        resolve: getAllUsers,
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createUser: {
        type: User,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          firstName: { type: new GraphQLNonNull(GraphQLString) },
          lastName: { type: new GraphQLNonNull(GraphQLString) },
          addressLine1: { type: GraphQLString },
          addressLine2: { type: GraphQLString },
          city: { type: GraphQLString },
          parish: { type: GraphQLString },
          country: { type: GraphQLString },
          zip: { type: GraphQLString },
        },
        resolve: createUserResolver,
      },
    },
  }),
});

export const schema = createSchema({ typeDefs: gqlSchema });
