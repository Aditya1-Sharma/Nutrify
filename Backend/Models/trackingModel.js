import mongoose from "mongoose";
import Dateonly from "mongoose-dateonly";
const tracingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foods",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    eatenDate: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
  },
  { timestamps: true }
);

export const trackingModel = mongoose.model("trackings", tracingSchema);
