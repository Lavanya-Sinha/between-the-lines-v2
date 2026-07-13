"use server";

import rateLimit from "@/lib/rate-limit/rateLimit";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { LoginValidation } from "@/lib/validation/LoginValidation";
import { createSession } from "@/lib/sessions/session";
import log from "@/lib/logging/logger";

const LogIn = async (FormData) => {
  try {
    
    const rawEmail = FormData.get("email");
    const rawPassword = FormData.get("password");
  
    const headerList = await headers()
    const forwardedFor = headerList.get("x-forwarded-for")
    const ip = forwardedFor? forwardedFor.split(",")[0].trim() : "127.0.0.1"
  
    const loginRateLimit = await rateLimit({
      prefix: "login",
      key: ip,
      limit: 5,
      window: 60
    }
    )
  
    if(!loginRateLimit.allowed){
      log({
        level: "WARN",
        file: "src/app/actions/Login.js",
        operation: "Rate Limit",
        message: "Login rate limit exceeded.",
      });
    throw new Error(`Too Many Login Attempts. Retry after ${loginRateLimit.retryAfter} seconds.`)
    }
  
    const validation = LoginValidation({email: rawEmail, password: rawPassword})
    if(!validation.success){
     throw new Error(validation.error)
    }
    const {email, password} = validation.data
  
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
  
    if (!user) {
      log({
      level: "WARN",
      file: "src/app/actions/Login.js",
      operation: "Login",
      message: "Login failed. User not found.",
    });
      throw new Error("Invalid email or password.");
    }
    let isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
       log({
      level: "WARN",
      file: "src/app/actions/Login.js",
      operation: "Login",
      message: "Login failed. Incorrect password.",
    });
      throw new Error("Invalid email or password.");
    }
    const sessionId = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    
    await createSession(sessionId, user.id)
    const cookieStore = await cookies()
    cookieStore.set({
      name : "sessionId",
      value : sessionId,
      expires : expiresAt,
      httpOnly : true,
      secure : process.env.NODE_ENV === "production",
      sameSite : "lax"
    })
  
    log({
    level: "INFO",
    file: "src/app/actions/Login.js",
    operation: "Login",
    message: "User logged in successfully.",
    userId: user.id,
  });
    redirect('/dashboard')
  } catch (error) {
      log({
      level:"ERROR",
      file:"src/app/actions/Login.js",
      operation:"Login",
      message:"Unexpected login failure.",
      error:error.message
   })

   throw error
  }
};
export default LogIn;
