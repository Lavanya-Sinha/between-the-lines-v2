"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const CreateQuote = async(formData)=>{
    const quoteText = formData.get("quote-text")
    const bookId = formData.get("id")
 
await requireOwnership("books", bookId)
    await prisma.quotes.create({
        data: {
            text: quoteText,
            book_id : Number.parseInt(bookId)
        }
    })
     redirect(`/book/${bookId}`);
}
export default CreateQuote