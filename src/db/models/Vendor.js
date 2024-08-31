import mongoose, { Schema } from "mongoose";
import { nanoid } from "nanoid";

const vendorSchema = new mongoose.Schema(
  {
    vendorId: {
      type: String,
      required: true,
      default: () => nanoid(8),
      index: { unique: true },
    },
    vendorName: {
      type: String,
      required: true,
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
    },
    contact: {
      type: [String],
      required: true,
    },
    hours: [
      new Schema({
        day: {
          type: String,
          required: true,
        },
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      }),
    ],
    media: {
      type: [new Schema({ url: String, alt: String, type: String })],
      default: [],
    },
  },
  { timestamps: true },
);

export const Vendor = mongoose.model("Vendor", vendorSchema, "vendors");
