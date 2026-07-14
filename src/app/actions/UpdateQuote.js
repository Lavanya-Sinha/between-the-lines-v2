"use server";
import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { QuoteValidation } from "@/lib/validation/QuoteValidation";
import { invalidateBook, invalidateQuote } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const UpdateQuote = async (FormData) => {
  try {
    const originalText = FormData.get("text");
    const quoteId = FormData.get("quote_id");
    const bookId = FormData.get("book_id");

    const validation = QuoteValidation({ text: originalText });
    if (!validation.success) {
      throw new Error(validation.error);
    }
    const { text } = validation.data;

    await requireWriteAccess();

    await requireOwnership("quotes", quoteId);
    await prisma.quotes.update({
      where: {
        id: Number.parseInt(quoteId),
      },
      data: {
        text,
      },
    });
    await invalidateBook(bookId);
    await invalidateQuote(quoteId);
    log({
      level: "INFO",
      file: "src/app/actions/UpdateQuote.js",
      operation: "Update Quote",
      message: "Quote Updated.",
      userId: user.id,
    });
    redirect(`/book/${bookId}/quote/${quoteId}`);
  } catch (error) {
       log({
      level: "ERROR",
      file: "src/app/actions/UpdateQuote.js",
      operation: "Update Quote",
      message: "Failed to update quote.",
      error: error.message,
    });

    throw error;
  }
};
export default UpdateQuote;
