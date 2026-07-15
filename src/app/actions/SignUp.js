"use server";
import { headers } from "next/headers";
import rateLimit from "@/lib/rate-limit/rateLimit";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { SignupValidation } from "@/lib/validation/SignupValidation";
import log from "@/lib/logging/logger";


const SignUp = async (FormData) => {
  try {
    const rawDisplayName = FormData.get("display_name");
    const rawEmail = FormData.get("email");
    const rawPassword = FormData.get("password");
    const rawConfirmPassword = FormData.get("confirm_password");

    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const signupRateLimit = await rateLimit({
      prefix: "signup",
      key: ip,
      limit: 5,
      window: 60,
    });

    if (!signupRateLimit.allowed) {
      log({
        level: "WARN",
        file: "src/app/actions/SignUp.js",
        operation: "Rate Limit",
        message: "Signup rate limit exceeded.",
      });
      throw new Error(
        `Too Many Sign-Up Attempts. Retry in ${signupRateLimit.retryAfter} seconds.`,
      );
    }

    const validation = SignupValidation({
      displayName: rawDisplayName,
      email: rawEmail,
      password: rawPassword,
      confirmPassword: rawConfirmPassword,
    });
    if (!validation.success) {
      throw new Error(validation.error);
    }
    const { displayName, email, password } = validation.data;
    const existingUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      log({
        level: "WARN",
        file: "src/app/actions/SignUp.js",
        operation: "Signup",
        message: "Email Already Exists.",
      });

      throw new Error("User Already Exists!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
   const user = await prisma.users.create({
      data: {
        display_name: displayName,
        email,
        password_hash: hashedPassword,
      },
    });
    log({
      level: "INFO",
      file: "src/app/actions/SignUp.js",
      operation: "Signup",
      message: "User signed up successfully.",
      userId: user.id,
    });
    redirect("/login");
  } catch (error) {
    log({
      level: "ERROR",
      file: "src/app/actions/SignUp.js",
      operation: "Signup",
      message: "Unexpected signup failure.",
      error: error.message,
    });

    throw error;
  }
};
export default SignUp;
