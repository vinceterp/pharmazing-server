import { GraphQLError } from "graphql";
import { CartErrorMessage } from "../../../utils/enums.js";
import { Cart } from "../../../db/models/Cart.js";

export const cartFieldResolver = async (parent, args, context) => {
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
