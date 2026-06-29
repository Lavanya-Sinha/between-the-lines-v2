"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LogIn = async (FormData) => {
  const email = FormData.get("email");
  const password = FormData.get("password");
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  let isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  await prisma.sessions.create({
    data: {
      session_id: sessionId,
      expires_at: expiresAt,
      user : {
        connect : {
          id : user.id
        }
      }
    },
  });
  const cookieStore = await cookies()
  cookieStore.set({
    name : "sessionId",
    value : sessionId,
    expires : expiresAt,
    httpOnly : true,
    secure : process.env.NODE_ENV === "production",
    sameSite : "lax"
  })
  redirect('/')
};
export default LogIn;
