"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const RemoveMoodTag = async(FormData)=>{
 const quoteId = Number.parseInt(FormData.get("quote_id"))
 const tagId = Number.parseInt(FormData.get("tag_id"))
 const bookId = FormData.get("book_id")
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
 redirect(`/book/${bookId}/quote/${quoteId}`)
}
export default RemoveMoodTag