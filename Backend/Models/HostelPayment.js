import mongoose from "mongoose";

const hostelPaymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    amount: {
      type: Number,
      required: true, // copied from Room.price at creation time
    },

    month: {
      type: Number, // 1–12
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["due", "paid"],
      default: "due",
    },

    stripePaymentIntentId: {
      type: String,
    },

    paidAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

hostelPaymentSchema.index({ student: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("HostelPayment", hostelPaymentSchema);
