"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const CreateQuote = async(formData)=>{
    const quoteText = formData.get("quote-text")
    const bookId = formData.get("id")
    
    console.log("Running on server...");
    console.log(quoteText, bookId);

    console.log(Object.keys(prisma));

    await prisma.quotes.create({
        data: {
            text: quoteText,
            book_id : Number.parseInt(bookId)
        }
    })
     redirect(`/book/${bookId}`);
}
export default CreateQuote