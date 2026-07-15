import { NextResponse } from "next/server";
import verifyGoogleToken from "@/lib/auth/verifyGoogleToken";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/sessions/session";
import { cookies, headers } from "next/headers";
import crypto from "crypto";
import rateLimit from "@/lib/rate-limit/rateLimit";
import log from "@/lib/logging/logger";

export async function POST(request) {
  try {
    const body = await request.json();

    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const googleRateLimit = await rateLimit({
      prefix: "googleSignIn",
      key: ip,
      limit: 5,
      window: 60,
    });

    if (!googleRateLimit.allowed) {
      log({
        level: "WARN",
        file: "src/app/api/googleOAuth/route.js",
        operation: "Rate Limit",
        message: "google signin rate limit exceeded.",
      });
      throw new Error(
        `Too Many google sign in Attempts. Retry after ${googleRateLimit.retryAfter} seconds.`,
      );
    }

    const payload = await verifyGoogleToken(body.credential);
    const { email, displayName } = payload;

    let user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      user = await prisma.users.create({
        data: {
          display_name: displayName,
          email,
          password_hash: null,
          provider: "GOOGLE",
        },
      });
    }

    const sessionId = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await createSession(sessionId, user.id);
    const cookieStore = await cookies();
    cookieStore.set({
      name: "sessionId",
      value: sessionId,
      expires: expiresAt,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    log({
      level: "INFO",
      file: "src/app/api/googleOAuth/route.js",
      operation: "Google Sign In",
      message: "User signed in successfully.",
      userId: user.id,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    log({
      level: "ERROR",
      file: "src/app/api/googleOAuth/route.js",
      operation: "Google Sign In",
      message: "Unexpected sign in failure.",
      error: error.message,
    });
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 400,
      },
    );
  }
}
