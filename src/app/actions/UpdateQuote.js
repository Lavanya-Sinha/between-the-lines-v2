"use server"
import requireOwnership from "@/lib/auth/requireOwnership"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { QuoteValidation } from "@/lib/validation/QuoteValidation"

const UpdateQuote = async(FormData)=>{
const originalText = FormData.get("text")
const quoteId = FormData.get("quote_id")
const bookId = FormData.get("book_id")

const validation = QuoteValidation({text : originalText})
if(!validation.success){
    throw new Error(validation.error)
}
const{text} = validation.data

await requireOwnership("quotes",quoteId)
await prisma.quotes.update({
    where:{
        id : Number.parseInt(quoteId)
    },
    data : {
        text
    }
})
redirect(`/book/${bookId}/quote/${quoteId}`)
}
export default UpdateQuote