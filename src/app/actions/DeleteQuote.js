"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { invalidateBook, invalidateQuote } from "@/lib/cache/Invalidate";

const DeleteQuote = async (FormData) => {

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
  redirect(`/book/${bookId}`);
};
export default DeleteQuote;
