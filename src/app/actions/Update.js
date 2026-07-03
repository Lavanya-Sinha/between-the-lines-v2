"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const UpdateBook = async(FormData)=>{
    const title = FormData.get("title")
    const author = FormData.get("author")
    const bookId = FormData.get("book_id")
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