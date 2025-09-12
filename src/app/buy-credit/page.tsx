/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Orders } from "razorpay/dist/types/orders";
import { toast } from "react-toastify";

import { assets } from "@/lib/assets";
import { plans } from "@/lib/assets";
import { useAppContext } from "@/context/app-context";
import { buyCredits, verifyPayment } from "@/lib/actions/image-action";
import { PlanType } from "@/lib/form-schema";
import { isLoggedIn } from "@/lib/actions/user-actions";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Credit() {
  const { user, setShowLogin, setUser } = useAppContext();
  const router = useRouter();

  const initPayment = async (order: Orders.RazorpayOrder) => {
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;
    const options = {
      key: key_id,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment for ai image generation",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response: unknown) => {
        try {
          const { success, message } = await verifyPayment(
            (response as { rarazorpay_order_id: string }).rarazorpay_order_id ||
              ""
          );
          if (success === true) {
            toast.success(message);
            const { user } = await isLoggedIn();
            setUser(user);
            router.push("/");
          } else {
            toast.error(message);
          }
        } catch (error) {
          toast.error((error as Error).message);
        }
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const initRazorpayTransaction = async (plan: PlanType) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    try {
      const { success, error, data } = await buyCredits(plan);
      if (!success && error) {
        toast.error(error);
      }
      if (success && data) {
        await initPayment(data);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="min-h-[80dvh] text-center"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-5 cursor-pointer">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plan
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <Image
              src={assets.logo_icon}
              alt="lock icon"
              width={31}
              height={31}
              className="w-[40px] h-auto"
            />
            <p className="mt-3 mb-1 font-semibold">{plan.name}</p>
            <p className="text-sm">{plan.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${plan.price}</span> /{" "}
              {plan.credits} credits
            </p>
            <button
              className="cursor-pointer w-full bg-gray-800 text-white mt-8 text-small rounded-md py-2.5 min-w-52 text-center hover:opacity-60 transition-opacity duration-200"
              onClick={() => initRazorpayTransaction(plan.name)}
            >
              {user === null ? "Get Started" : "Purchase"}
            </button>
          </div>
        ))}
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
      </div>
    </motion.div>
  );
}
