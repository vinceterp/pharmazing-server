import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from "graphql";
import { Address } from "../Address/types.js";

export const CartItem = new GraphQLObjectType({
  name: "CartItem",
  fields: {
    productId: { type: GraphQLString },
    quantity: { type: GraphQLInt },
  },
});

export const CartItemInput = new GraphQLInputObjectType({
  name: "CartItemInput",
  fields: {
    productId: { type: GraphQLString },
    quantity: { type: GraphQLInt },
  },
});

export const Cart = new GraphQLObjectType({
  name: "Cart",
  fields: {
    cartId: { type: GraphQLString },
    userId: { type: GraphQLString },
    items: { type: new GraphQLList(CartItem) },
    subtotal: { type: GraphQLFloat },
    tax: { type: GraphQLFloat },
    total: { type: GraphQLFloat },
    shippingAddress: { type: Address },
    billingAddress: { type: Address },
  },
});

export const CreateCartInput = new GraphQLInputObjectType({
  name: "CreateCartInput",
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    items: { type: new GraphQLList(CartItemInput) },
    subtotal: { type: GraphQLFloat },
    tax: { type: GraphQLFloat },
    total: { type: GraphQLFloat },
    shippingAddress: { type: GraphQLString },
    billingAddress: { type: GraphQLString },
  },
});
