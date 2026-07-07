"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookValidation } from "@/lib/validation/BookValidation";

const UpdateBook = async(FormData)=>{
    const originalTitle = FormData.get("title")
    const originalAuthor = FormData.get("author")
    const bookId = FormData.get("book_id")

    const validation = BookValidation({
        title : originalTitle,
        author : originalAuthor
    })
    if(!validation.success){
        throw new Error(validation.error)
    }
    const{title, author} = validation.data

    await requireOwnership("books", bookId)
    await prisma.books.update({
        where : {
            id : Number.parseInt(bookId)
        },
        data : {
            title,
            author
        }
    })
    redirect(`/book/${bookId}`);
}
export default UpdateBook