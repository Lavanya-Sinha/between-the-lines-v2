"use server";
import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookValidation } from "@/lib/validation/BookValidation";
import SaveFile from "@/lib/uploads/SaveFile";

const CreateBook = async (formData) => {
  const rawTitle = formData.get("title");
  const rawAuthor = formData.get("author");
  const rawGenres = formData.get("genres");
  const bookCover = formData.get("book_cover");

  const validation = BookValidation({
    title: rawTitle,
    author: rawAuthor,
     genres: rawGenres,
  });
  if (!validation.success) {
    throw new Error(validation.error);
  }
  const { title, author, genres } = validation.data;

  const user = await requireUser();

  let saveCover = null
if (bookCover && bookCover.size > 0) {
   saveCover = await SaveFile(bookCover, "covers")
}


  await prisma.books.create({
    data: {
      title,
      author,
      genres,
      cover_img: saveCover?.fileUrl,
      cover_public_id: saveCover?.publicId,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  redirect("/dashboard");
};
export default CreateBook;
