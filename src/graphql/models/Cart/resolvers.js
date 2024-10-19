import { GraphQLError } from "graphql";
import { CartErrorMessage } from "../../../utils/enums.js";
import { Cart } from "../../../db/models/Cart.js";

export const cartFieldResolver = async (parent) => {
  try {
    const { userId } = parent;
    const userCart = await Cart.findOne({ userId });
    if (!userCart.length) throw new GraphQLError(CartErrorMessage.NOT_FOUND);
    return userCart;
    // fix this to return the cart items
  } catch (e) {
    return e;
  }
};

export const cartQueryResolver = async (_root, args) => {
  try {
    const { userId } = args;
    const userCart = await Cart.findOne({ userId });
    if (!userCart) throw new GraphQLError(CartErrorMessage.NOT_FOUND);
    return userCart;
  } catch (e) {
    return e;
  }
};

export const createCartResolver = async (_root, args) => {
  try {
    const { cart } = args;
    const {
      userId,
      items,
      subtotal,
      tax,
      total,
      shippingAddress,
      billingAddress,
    } = cart;

    const userCart = await Cart.findOne({ userId });
    if (userCart) throw new GraphQLError(CartErrorMessage.ALREADY_EXISTS);
    const newCart = new Cart({
      userId,
      items,
      subtotal,
      tax,
      total,
      shippingAddress,
      billingAddress,
    });
    await newCart.save();
    return { ...newCart.toObject() };
  } catch (e) {
    return e;
  }
};
