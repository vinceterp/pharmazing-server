import mongoose, { Schema } from "mongoose";
import { nanoid } from "nanoid";
import { mediaSchema } from "../common/types.js";

const vendorSchema = new mongoose.Schema(
  {
    vendorId: {
      type: String,
      required: true,
      default: () => nanoid(16),
      index: { unique: true },
    },
    vendorName: {
      type: String,
      required: true,
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
      type: [mediaSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export const Vendor = mongoose.model("Vendor", vendorSchema, "vendors");
