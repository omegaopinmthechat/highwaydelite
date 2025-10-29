import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
    min: 0,
  },
});

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    basePrice: {
      type: Number,
      min: 0,
    },
    taxRate: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.05,
    },
    dates: [
      {
        type: String,
      },
    ],
    times: [timeSlotSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Experience", experienceSchema);
