"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { useActionState, useEffect, useState } from "react";

import { assets } from "@/lib/assets";
import { useAppContext } from "@/context/app-context";
import { authAction } from "@/lib/actions/user-actions";
import { FormType } from "@/lib/form-schema";

const AuthFrom = () => {
  const [state, setState] = useState<FormType>("Login");

  const { showLogin, setShowLogin, setUser } = useAppContext();

  const [formState, formAction, isPending] = useActionState(authAction, {
    success: false,
    error: "",
    user: null,
  });

  useEffect(() => {
    if (formState.user) {
      setUser(formState.user);
      setShowLogin(false);
      if (formState.success) {
        const message =
          state === "Login" ? "login success" : "account created successfully";
        toast.success(message);
      }
    }

    if (formState.error && !formState.success) {
      toast.error(formState.error);
    }
  }, [formState, setUser, setShowLogin, state]);

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showLogin]);

  return (
    <AnimatePresence>
      {showLogin && (
        <div className="fixed top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
          <motion.form
            action={formAction}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white p-10 rounded-xl text-slate-500"
          >
            <h1 className="text-center text-2xl text-neutral-700 font-medium">
              {state}
            </h1>
            <p className="text-sm">Welcome back! Please sign in to continue</p>
            {state !== "Login" && (
              <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
                <Image
                  src={assets.profile_icon}
                  alt="lock icon"
                  width={180}
                  height={180}
                  className="w-[25px] h-[25px]"
                />
                <input
                  className="outline-none text-sm"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
              <Image
                src={assets.email_icon}
                alt="lock icon"
                width={16}
                height={11}
                className="w-[25px] h-[25px]"
              />
              <input
                className="outline-none text-sm"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <input type="hidden" name="formType" value={state} />
            </div>
            <div className="border px-7 py-2 flex items-center gap-2 rounded-full mt-4">
              <Image
                src={assets.lock_icon}
                alt="lock icon"
                width={11}
                height={14}
                className="w-[25px] h-[25px]"
              />
              <input
                className="outline-none text-sm"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <p className="text-sm text-blue-600 hover:opacity-70 my-4 cursor-pointer">
              Forgot password?
            </p>
            <button
              disabled={isPending}
              type="submit"
              className="text-white bg-blue-600 hover:opacity-70 py-2 w-full rounded-full cursor-pointer"
            >
              {state === "Login" ? "login" : "create account"}
            </button>
            {state === "Login" ? (
              <p className="mt-5 text-center">
                Don&apos;t have an account{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-blue-600 cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p className="mt-5 text-center">
                Already have an account{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-blue-600 cursor-pointer"
                >
                  Login
                </span>
              </p>
            )}
            <Image
              src={assets.cross_icon}
              alt="lock icon"
              onClick={() => setShowLogin(false)}
              width={11}
              height={14}
              className="w-[15px] h-[15px] absolute top-5 right-5 cursor-pointer"
            />
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthFrom;
