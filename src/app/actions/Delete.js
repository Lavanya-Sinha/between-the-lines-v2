"use server";
import requireUser from "@/lib/auth/requireUser";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const DeleteBook = async (formData) => {
  const user = await requireUser()
  const bookId = formData.get("id");
  
  await requireOwnership("books", bookId)
  const quotes = await prisma.quotes.findMany({
    where: {
      book_id: Number.parseInt(bookId),
    },
  });
  const quoteIds = quotes.map((quote) => quote.id);
  await prisma.reflections.deleteMany({
    where: {
      quote_id: {
        in: quoteIds,
      },
    },
  });
  await prisma.quotes.deleteMany({
    where: {
      book_id: Number.parseInt(bookId),
    },
  });
  await prisma.books.delete({
    where: {
      id: Number.parseInt(bookId),
    },
  });

  console.log("BOOK DELETED");
  console.log("ABOUT TO REDIRECT");

  redirect("/dashboard");
};
export default DeleteBook;
