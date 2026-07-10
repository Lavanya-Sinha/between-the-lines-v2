"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookValidation } from "@/lib/validation/BookValidation";
import SaveFile from "@/lib/uploads/SaveFile";
import DeleteFile from "@/lib/uploads/DeleteFile";

const UpdateBook = async (FormData) => {
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

  console.log("Old Public ID:", currentBook.cover_public_id);
console.log("New Public ID:", updatedCoverImage.publicId);
  if(updatedCoverImage !== null){
   await DeleteFile(currentBook.cover_public_id, "image")
  }
  
  redirect(`/book/${bookId}`);
};
export default UpdateBook;
