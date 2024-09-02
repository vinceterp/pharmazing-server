import { Schema } from "mongoose";

export const mediaSchema = new Schema({
  url: String,
  alt: String,
  type: String,
});
