"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { invalidateQuote, invalidateDoodle } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const UpdateDoodle = async (doodleId, canvasData) => {
  try {
    await requireWriteAccess();
    const doodle = await requireOwnership("doodles", doodleId);
    const updatedDoodle = await prisma.doodles.update({
      where: {
        id: Number.parseInt(doodleId),
      },
      data: {
        canvas_data: canvasData,
      },
    });
    //redis cache invalidation
    await invalidateDoodle(updatedDoodle.quote_id);
    await invalidateQuote(updatedDoodle.quote_id);

    log({
      level: "INFO",
      file: "src/app/actions/UpdateDoodle.js",
      operation: "Update Doodle",
      message: "Doodle Updated.",
      userId: user.id,
    });
    redirect(`/book/${doodle.quote.book.id}/quote/${doodle.quote.id}`);
  } catch (error) {
      log({
      level: "ERROR",
      file: "src/app/actions/UpdateDoodle.js",
      operation: "Update Doodle",
      message: "Failed to update Doodle.",
      error: error.message,
    });

    throw error;
  }
};
export default UpdateDoodle;
