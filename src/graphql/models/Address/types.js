import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLFloat,
} from "graphql";

export const Address = new GraphQLObjectType({
  name: "Address",
  fields: {
    userId: { type: GraphQLID },
    addressId: { type: GraphQLID },
    primary: { type: GraphQLBoolean },
    addressLine1: { type: GraphQLString },
    addressLine2: { type: GraphQLString },
    city: { type: GraphQLString },
    parish: { type: GraphQLString },
    zip: { type: GraphQLString },
    country: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
  },
});

export const CreateAddressInputType = new GraphQLInputObjectType({
  name: "CreateAddressInput",
  fields: {
    primary: { type: new GraphQLNonNull(GraphQLBoolean) },
    addressLine1: { type: new GraphQLNonNull(GraphQLString) },
    addressLine2: { type: GraphQLString },
    city: { type: GraphQLString },
    parish: { type: new GraphQLNonNull(GraphQLString) },
    zip: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    latitude: { type: new GraphQLNonNull(GraphQLFloat) },
    longitude: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const EditAddressInput = new GraphQLInputObjectType({
  name: "EditAddressInput",
  fields: {
    addressId: { type: GraphQLID },
    primary: { type: GraphQLBoolean },
    addressLine1: { type: GraphQLString },
    addressLine2: { type: GraphQLString },
    city: { type: GraphQLString },
    parish: { type: GraphQLString },
    zip: { type: GraphQLString },
    country: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
  },
});

export const DeleteAddressResult = new GraphQLObjectType({
  name: "DeleteAddressResult",
  fields: {
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});
