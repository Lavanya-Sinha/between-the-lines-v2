"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { invalidateBook, invalidateQuote } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const DeleteQuote = async (FormData) => {
  try {
      await requireWriteAccess()
      const quoteId = Number.parseInt(FormData.get("quote_id"));
      const bookId = FormData.get("book_id");
      await requireOwnership("quotes", quoteId);
      await prisma.reflections.deleteMany({
        where: {
          quote_id: quoteId,
        },
      });
      await prisma.quotes.delete({
        where: {
          id: quoteId,
        },
      });
    
      await invalidateBook(bookId);
      await invalidateQuote(quoteId);
       
    log({
      level: "INFO",
      file: "src/app/actions/DeleteQuote.js",
      operation: "Delete Quote",
      message: "Quote Deleted",
      userId: user.id,
    });
      redirect(`/book/${bookId}`);
    
  } catch (error) {
    log({
      level: "ERROR",
      file: "src/app/actions/DeleteQuote.js",
      operation: "Delete Quote",
      message: "Failed to delete the quote.",
      error: error.message,
    });

    throw error;
  }
};
export default DeleteQuote;
