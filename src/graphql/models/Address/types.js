import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
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
  },
});
