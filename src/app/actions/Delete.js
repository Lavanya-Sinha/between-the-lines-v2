"use server";
import requireUser from "@/lib/auth/requireUser";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import fs from "fs/promises"
import path from "path";

const DeleteBook = async (formData) => {
  await requireUser()
  const bookId = formData.get("id");
  
  await requireOwnership("books", bookId)

    const attachments = await prisma.attachments.findMany({
    where:{
      quote: {
      book_id: Number(bookId),
    },
    }
  })

  for(const attachment of attachments){
   const filePath = path.join(process.cwd(),"/public", attachment.file_url)
   try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete ${filePath}`, error);
  }
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
