"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import User from "../db/models/user";
import { FormType, loginSchema, signUpSchema } from "@/lib/form-schema";
import { connectDB } from "../db/config";

const COOKIE = "auth_token";

type AuthState = {
  success: boolean;
  error: string;
  user: { name: string } | null;
};

type UserSchema = {
  name?: string;
  email: string;
  password: string;
};

export const authAction = async (_: AuthState, formData: FormData) => {
  await connectDB();
  const formType = formData.get("formType") as FormType;

  if (formType === "Sign Up") {
    const result = signUpSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.success) {
      return { success: false, error: "invalid credentials", user: null };
    }
    return await signUp(result.data);
  } else {
    const result = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.success) {
      return { success: false, error: "invalid credentials", user: null };
    }

    return await signIn(result.data);
  }
};

const signUp = async (userData: UserSchema) => {
  const name = userData.name as string;
  const email = userData.email;
  const password = userData.password;
  try {
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return { success: false, error: "user already exists", user: null };
    }
    const userCreateData = {
      name,
      email,
      password,
    };

    const newUser = new User(userCreateData);
    const user = await newUser.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY! as string,
      { expiresIn: "12h" }
    );

    const responseCookies = await cookies();
    responseCookies.set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 12 * 1000, // 12 hours
      path: "/",
    });

    return {
      success: true,
      error: "",
      user: { name: user.name, credits: user.creditBalance },
    };
  } catch {
    return { success: false, error: "something went wrong", user: null };
  }
};

export const signIn = async (userData: UserSchema) => {
  const email = userData.email;
  const password = userData.password;

  try {
    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      return { success: false, error: "user does not exist", user: null };
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return { success: false, error: "invalid credentials", user: null };
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY! as string,
      { expiresIn: "12h" }
    );

    const responseCookies = await cookies();
    responseCookies.set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 12, // 12 hours
      path: "/",
    });

    return {
      success: true,
      error: "",
      user: { name: existingUser.name, credits: existingUser.creditBalance },
    };
  } catch {
    return { success: false, error: "something went wrong", user: null };
  }
};

export async function logout() {
  (await cookies()).delete(COOKIE);
  return { success: true, message: "logout success!" };
}

export async function isLoggedIn() {
  await connectDB();
  const { user } = await getUser();
  return user === null
    ? { user: null }
    : { user: { name: user.name, credits: user.creditBalance } };
}

export async function getUser() {
  const cookie = (await cookies()).get(COOKIE);
  if (!cookie) {
    return { user: null };
  }
  try {
    const token = cookie.value;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;

    const user = await User.findById(decoded.id);
    if (user) {
      return { user };
    }
    return { user: null };
  } catch {
    return { user: null };
  }
}
