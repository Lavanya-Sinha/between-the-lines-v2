"use server";
import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { invalidateQuote } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const RemoveMoodTag = async (FormData) => {
  try {
    await requireWriteAccess();
    const quoteId = Number.parseInt(FormData.get("quote_id"));
    const tagId = Number.parseInt(FormData.get("tag_id"));
    const bookId = FormData.get("book_id");
    await requireOwnership("quotes", quoteId);
    const user = await prisma.quotes.update({
      where: {
        id: quoteId,
      },
      data: {
        mood_tags: {
          disconnect: {
            id: tagId,
          },
        },
      },
    });
    //redis cache invalidation
    await invalidateQuote(quoteId);
    log({
      level: "INFO",
      file: "src/app/actions/RemoveMoodTag.js",
      operation: "Remove Mood Tag",
      message: "Mood Tag Removed.",
      userId: user.id,
    });
    redirect(`/book/${bookId}/quote/${quoteId}`);
  } catch (error) {
    log({
      level: "ERROR",
      file: "src/app/actions/RemoveMoodTag.js",
      operation: "Remove Mood Tag",
      message: "Failed to remove the mood tag.",
      error: error.message,
    });

    throw error;
  }
};
export default RemoveMoodTag;
