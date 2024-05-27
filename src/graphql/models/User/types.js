import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
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
    token: { type: GraphQLString },
  },
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: "CreateUserInput",
  fields: {
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
});

export const EditUserInputType = new GraphQLInputObjectType({
  name: "EditUserInput",
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    // password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    // address: new GraphQLInputObjectType({
    //   name: "AddressInput",
    //   fields: {
    //     userId: { type: GraphQLString },
    //     addressId: { type: GraphQLString },
    //     addressLine1: { type: GraphQLString },
    //     addressLine2: { type: GraphQLString },
    //     city: { type: GraphQLString },
    //     parish: { type: GraphQLString },
    //     country: { type: GraphQLString },
    //     zip: { type: GraphQLString },
    // }})
  },
});

export const DeleteUserInputType = new GraphQLInputObjectType({
  name: "DeleteUserInput",
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});
