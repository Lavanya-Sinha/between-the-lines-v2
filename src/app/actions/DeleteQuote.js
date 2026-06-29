"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const DeleteQuote = async(FormData)=>{
    const quoteId = Number.parseInt(FormData.get("quote_id"))
    const bookId = FormData.get("book_id")
    await prisma.reflections.deleteMany({
        where : {
            quote_id : quoteId
        }
    })
    await prisma.quotes.delete({
        where : {
            id : quoteId
        }
    })
    redirect(`/book/${bookId}`)
}
export default DeleteQuote