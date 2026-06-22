"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const DeleteBook = async(formData)=>{
    const id = formData.get("id")
await prisma.books.delete({
    where : {
        id : Number.parseInt(id)
    }
})

  console.log("BOOK DELETED");
  console.log("ABOUT TO REDIRECT");

  redirect("/");
}
export default DeleteBook