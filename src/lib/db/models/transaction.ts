import mongoose from "mongoose";

import { PlanType } from "@/lib/form-schema";

export type Transaction = {
  userId: mongoose.Schema.Types.ObjectId;
  plan: PlanType;
  cost: number;
  credits: number;
  date: number;
  paymentStatus: boolean;
};

const transactionSchema = new mongoose.Schema<Transaction>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  plan: { type: String, required: true },
  cost: { type: Number, required: true },
  credits: { type: Number, required: true },
  date: { type: Number, required: true },
  paymentStatus: { type: Boolean, default: false },
});

export const Transaction =
  (mongoose.models.transaction as mongoose.Model<Transaction>) ||
  mongoose.model<Transaction>("transaction", transactionSchema);

export default Transaction;
