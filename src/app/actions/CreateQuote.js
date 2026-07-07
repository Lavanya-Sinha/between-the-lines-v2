"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { QuoteValidation } from "@/lib/validation/QuoteValidation";

const CreateQuote = async(formData)=>{
    const rawQuoteText = formData.get("quote-text")
    const bookId = formData.get("id")
 
    const validation = QuoteValidation({text: rawQuoteText})
    if(!validation.success){
      throw new Error(validation.error)
    }
    const {text} = validation.data

await requireOwnership("books", bookId)
    await prisma.quotes.create({
        data: {
            text,
            book_id : Number.parseInt(bookId)
        }
    })
     redirect(`/book/${bookId}`);
}
export default CreateQuote