"use server"
import requireOwnership from "@/lib/auth/requireOwnership"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

const UpdateQuote = async(FormData)=>{
const text = FormData.get("text")
const quoteId = FormData.get("quote_id")
const bookId = FormData.get("book_id")

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