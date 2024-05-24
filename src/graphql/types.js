import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from "graphql";

export const Address = new GraphQLObjectType({
  name: "Address",
  fields: {
    userId: { type: GraphQLID },
    addressLine1: { type: new GraphQLNonNull(GraphQLString) },
    addressLine2: { type: GraphQLString },
    city: { type: new GraphQLNonNull(GraphQLString) },
    parish: { type: new GraphQLNonNull(GraphQLString) },
    zip: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const User = new GraphQLObjectType({
  name: "User",
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    age: { type: GraphQLInt },
    address: { type: Address },
    cardId: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
    error: { type: GraphQLString },
    token: { type: GraphQLString },
  },
});
