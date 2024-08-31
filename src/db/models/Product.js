import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
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
      type: [new Schema({ url: String, alt: String, type: "video" | "image" })],
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema, "products");
