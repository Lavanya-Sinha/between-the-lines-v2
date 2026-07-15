"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { QuoteValidation } from "@/lib/validation/QuoteValidation";
import { invalidateBook } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const CreateQuote = async (formData) => {
  try {
    const rawQuoteText = formData.get("quote-text");
    const bookId = formData.get("id");

    const validation = QuoteValidation({ text: rawQuoteText });
    if (!validation.success) {
      throw new Error(validation.error);
    }
    const { text } = validation.data;

    await requireWriteAccess();
    await requireOwnership("books", bookId);

    const user = await prisma.quotes.create({
      data: {
        text,
        book_id: Number.parseInt(bookId),
      },
    });
    // redis cache invalidation
    await invalidateBook(bookId);

    log({
      level: "INFO",
      file: "src/app/actions/CreateQuote.js",
      operation: "Add A Quote",
      message: "Quote Added",
      userId: user.id,
    });
    redirect(`/book/${bookId}`);
  } catch (error) {
    log({
      level: "ERROR",
      file: "src/app/actions/CreateQuote.js",
      operation: "Add Quote",
      message: "Failed to Add The Quote.",
      error: error.message,
    });

    throw error;
  }
};
export default CreateQuote;
