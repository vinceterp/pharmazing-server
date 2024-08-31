import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
} from "graphql";
import { Address } from "../Address/types.js";

export const CartItem = new GraphQLObjectType({
  name: "CartItem",
  fields: {
    productId: { type: GraphQLString },
    quantity: { type: GraphQLInt },
  },
});

export const Cart = new GraphQLObjectType({
  name: "Cart",
  fields: {
    userId: { type: GraphQLString },
    cartId: { type: GraphQLString },
    items: { type: new GraphQLList(CartItem) },
    subtotal: { type: GraphQLFloat },
    tax: { type: GraphQLFloat },
    shippingAddress: { type: Address },
    billingAddress: { type: Address },
  },
});
