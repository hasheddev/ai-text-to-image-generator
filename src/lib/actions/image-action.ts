"use server";

import axios from "axios";
import FormData from "form-data";
import razorpay from "razorpay";

import { getUser } from "./user-actions";
import User from "../db/models/user";
import { connectDB } from "../db/config";
import Transaction from "../db/models/transaction";
import { PlanType } from "../form-schema";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;
const CURRENCY = process.env.CURRENCY!;

const razorpayInstance = new razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export const generateImage = async (prompt: string) => {
  await connectDB();
  const { user } = await getUser();
  if (!user) {
    return { success: false, error: "invalid credentials" };
  }
  if (!prompt || prompt.length < 2) {
    return { success: false, error: "invalid prompt" };
  }
  if (user.creditBalance <= 0) {
    return { success: false, error: "insufficient credit", credits: 0 };
  }
  const formData = new FormData();
  formData.append("prompt", prompt);
  try {
    const { data } = await axios.post(process.env.CLIP_DROP_API!, formData, {
      headers: {
        "x-api-key": process.env.CLIP_DROP_API_KEY!,
      },
      responseType: "arraybuffer",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const base64Image = Buffer.from(data as any, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });
    return {
      success: true,
      name: user.name,
      credits: user.creditBalance - 1,
      generatedImage: resultImage,
    };
  } catch {
    return { success: false, error: "error generating image" };
  }
};

export async function buyCredits(plan: PlanType) {
  await connectDB();
  const { user } = await getUser();
  if (!user || !plan) {
    return { success: false, error: "invalid credentials" };
  }

  try {
    let credits: number, cost: number;
    switch (plan) {
      case "Advanced":
        credits = 5000;
        cost = 250;
        break;

      case "Business":
        credits = 500;
        cost = 50;
        break;
      case "Basic":
        credits = 100;
        cost = 50;
        break;
      default:
        return { success: false, error: "plan not found" };
    }
    const userId = user._id;
    const date = Date.now();
    const transactionData = {
      userId,
      plan,
      cost,
      credits,
      date,
    };

    const transaction = await Transaction.create(transactionData);
    const options = {
      amount: cost * 100,
      currency: CURRENCY,
      receipt: transaction._id.toString(),
    };
    const order = await razorpayInstance.orders.create(options);
    return {
      success: true,
      message: "credit purchase successfull",
      data: order,
    };
  } catch (error) {
    const err = error as { error: { description: string } };
    const errorMessage = err.error.description || "An unknown error occurred.";
    return { success: false, error: errorMessage };
  }
}

export async function verifyPayment(order_id: string) {
  try {
    if (!order_id) {
      return { success: false, message: "Invalid transaction details" };
    }
    const orderInfo = await razorpayInstance.orders.fetch(order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await Transaction.findById(orderInfo.receipt);
      if (!transactionData) {
        return { success: false, message: "Invalid transaction details" };
      }
      if (transactionData.paymentStatus === true) {
        return { success: false, message: "Payment Already processed" };
      }
      const { user } = await getUser();
      if (!user) {
        return { success: false, message: "invalid credentials" };
      }
      const newBalance = user.creditBalance + transactionData.credits;
      user.creditBalance = newBalance;
      transactionData.paymentStatus = true;
      await Promise.all([user.save(), transactionData.save()]);
      return { success: true, message: "credits added" };
    }
    return { success: false, message: "payment failed" };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
