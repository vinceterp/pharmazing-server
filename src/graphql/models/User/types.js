import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { addressResolver } from "../Address/resolvers.js";
import { Address } from "../Address/types.js";

export const User = new GraphQLObjectType({
  name: "User",
  fields: {
    userId: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    age: { type: GraphQLInt },
    address: {
      type: new GraphQLList(new GraphQLNonNull(Address)),
      resolve: addressResolver,
    },
    error: { type: GraphQLString },
    token: { type: GraphQLString },
  },
});
