"use server";
import requireUser from "@/lib/auth/requireUser";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getResourceType } from "@/lib/cloudinary/getResourceType";
import DeleteFile from "@/lib/uploads/DeleteFile";
const DeleteBook = async (formData) => {
  await requireUser();
  const bookId = formData.get("id");

  await requireOwnership("books", bookId);

  const book = await prisma.books.findUnique({
    where: {
      id: Number(bookId),
    },
  });

  if (!book) {
    throw new Error("Book not found.");
  }

  const attachments = await prisma.attachments.findMany({
    where: {
      quote: {
        book_id: Number(bookId),
      },
    },
  });

  for (const attachment of attachments) {
    try {
      await DeleteFile(attachment.public_id,   getResourceType(attachment.mime_type));
    } catch (error) {
      console.error(`Failed to delete ${attachment.file_url}`, error);
    }
  }

  if (book.cover_public_id) {
    await DeleteFile(book.cover_public_id, "image");
  }

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
