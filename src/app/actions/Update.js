"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { invalidateDashboard, invalidateBook } from "@/lib/cache/Invalidate";
import { redirect } from "next/navigation";
import { BookValidation } from "@/lib/validation/BookValidation";
import SaveFile from "@/lib/uploads/SaveFile";


const UpdateBook = async (FormData) => {
  await requireWriteAccess()
  const originalTitle = FormData.get("title");
  const originalAuthor = FormData.get("author");
  const originalGenres = FormData.get("genres");
  const originalBookCover = FormData.get("book_cover");
  const bookId = FormData.get("book_id");

  const validation = BookValidation({
    title: originalTitle,
    author: originalAuthor,
    genres: originalGenres,
  });
  if (!validation.success) {
    throw new Error(validation.error);
  }
  const { title, author, genres } = validation.data;

  await requireOwnership("books", bookId);

  const currentBook = await prisma.books.findUnique({
    where: {
      id: Number(bookId),
    },
  });

  if (!currentBook) {
    throw new Error("Book not found.");
  }

    let updatedCoverImage = null;
  if (originalBookCover && originalBookCover.size > 0) {
    updatedCoverImage = await SaveFile(originalBookCover, "covers");
  }

  const updateData = {
    title,
    author,
    genres,
  };

  if (updatedCoverImage) {
    updateData.cover_img = updatedCoverImage.fileUrl;
    updateData.cover_public_id = updatedCoverImage.publicId;
  }
  await prisma.books.update({
    where: {
      id: Number.parseInt(bookId),
    },
    data: updateData,
  });

  //redis for cache invalidation
  await invalidateDashboard(currentBook.user_id);
  await invalidateBook(bookId);
  
  redirect(`/book/${bookId}`);
};
export default UpdateBook;
