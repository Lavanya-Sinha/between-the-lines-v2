"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { QuoteValidation } from "@/lib/validation/QuoteValidation";
import { invalidateBook } from "@/lib/cache/Invalidate";

const CreateQuote = async(formData)=>{
    const rawQuoteText = formData.get("quote-text")
    const bookId = formData.get("id")
 
    const validation = QuoteValidation({text: rawQuoteText})
    if(!validation.success){
      throw new Error(validation.error)
    }
    const {text} = validation.data

    await requireWriteAccess()
await requireOwnership("books", bookId)
    await prisma.quotes.create({
        data: {
            text,
            book_id : Number.parseInt(bookId)
        }
    })
    // redis cache invalidation
    await invalidateBook(bookId);
     redirect(`/book/${bookId}`);
}
export default CreateQuote