"use server";
import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { invalidateQuote } from "@/lib/cache/Invalidate";

const RemoveMoodTag = async(FormData)=>{
 await requireWriteAccess()
 const quoteId = Number.parseInt(FormData.get("quote_id"))
 const tagId = Number.parseInt(FormData.get("tag_id"))
 const bookId = FormData.get("book_id")
 await requireOwnership("quotes", quoteId);
 await prisma.quotes.update({
    where : {
        id : quoteId
    },
    data : {
        mood_tags :{
            disconnect : {
                id : tagId
            }
        }
    }
 })
 //redis cache invalidation
 await invalidateQuote(quoteId)
 redirect(`/book/${bookId}/quote/${quoteId}`)
}
export default RemoveMoodTag