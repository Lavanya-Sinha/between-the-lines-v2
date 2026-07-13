"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { invalidateQuote,invalidateDoodle } from "@/lib/cache/Invalidate";

const CreateDoodle = async(quoteId, canvasData)=>{
await requireWriteAccess()
const quote = await requireOwnership("quotes", quoteId);
await prisma.doodles.create({
    data:{
        canvas_data : canvasData,
        quote:{
         connect:{
            id : Number.parseInt(quoteId)
         }
        }
    }
})
//redis cache invalidation
await invalidateQuote(quoteId)
await invalidateDoodle(quoteId)

redirect(`/book/${quote.book_id}/quote/${quoteId}`);
}
export default CreateDoodle