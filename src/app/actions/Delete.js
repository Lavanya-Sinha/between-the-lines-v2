"use server";
import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { invalidateDashboard, invalidateBook } from "@/lib/cache/Invalidate";
import { redirect } from "next/navigation";
import { getResourceType } from "@/lib/cloudinary/getResourceType";
import DeleteFile from "@/lib/uploads/DeleteFile";
import log from "@/lib/logging/logger";

const DeleteBook = async (formData) => {
  try {
    await requireWriteAccess();
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
   
  //redis cache invalidation
  await invalidateDashboard(book.user_id);
  await invalidateBook(bookId);

   log({
      level: "INFO",
      file: "src/app/actions/Delete.js",
      operation: "Delete Book",
      message: "Book Deleted",
      userId: user.id,
    });
    redirect("/dashboard");
    
  } catch (error) {
     log({
      level: "ERROR",
      file: "src/app/actions/Delete.js",
      operation: "Delete Book",
      message: "Failed to delete the book.",
      error: error.message,
    });

    throw error;
  }
};
export default DeleteBook;
