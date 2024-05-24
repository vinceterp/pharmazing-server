import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from "graphql";
import { resolveCardIds } from "./resolvers.js";

export const Address = new GraphQLObjectType({
  name: "Address",
  fields: {
    userId: { type: GraphQLID },
    addressLine1: { type: GraphQLString },
    addressLine2: { type: GraphQLString },
    city: { type: GraphQLString },
    parish: { type: GraphQLString },
    zip: { type: GraphQLString },
    country: { type: GraphQLString },
  },
});

export const User = new GraphQLObjectType({
  name: "User",
  fields: {
    userId: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    age: { type: GraphQLInt },
    address: { type: Address },
    cardId: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
      resolve: resolveCardIds,
    },
    error: { type: GraphQLString },
    token: { type: GraphQLString },
  },
});
