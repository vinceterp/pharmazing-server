import mongoose, { Schema } from "mongoose";
import { nanoid } from "nanoid";

const cartOrderItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  cartId: {
    type: String,
    required: true,
    default: () => nanoid(16),
    index: { unique: true },
  },
  userId: {
    type: String,
    required: true,
  },
  items: { type: [cartOrderItemSchema], required: false },
  subtotal: {
    type: Number,
    // required: true,
  },
  tax: {
    type: Number,
    // required: true,
  },
  total: {
    type: Number,
    // required: true,
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    // required: true,
  },
  billingAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    // required: true,
  },
});

export const Cart = mongoose.model("Cart", cartSchema, "carts");
