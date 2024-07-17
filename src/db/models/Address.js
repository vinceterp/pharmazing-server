import mongoose from "mongoose";
import { nanoid } from "nanoid";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    addressId: {
      type: String,
      required: true,
      default: () => nanoid(8),
      index: { unique: true },
    },
    primary: {
      type: Boolean,
      default: false,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    parish: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Address = mongoose.model("Address", addressSchema, "addresses");
