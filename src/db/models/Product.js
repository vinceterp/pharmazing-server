import mongoose from "mongoose";
import { mediaSchema } from "../common/types.js";
import { nanoid } from "nanoid";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      default: () => nanoid(16),
      index: { unique: true },
    },
    vendorId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productCategory: {
      type: String,
      // required: true,
    },
    prescriptionRequired: {
      type: Boolean,
      required: true,
      default: false,
    },
    media: {
      type: [mediaSchema],
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema, "products");
