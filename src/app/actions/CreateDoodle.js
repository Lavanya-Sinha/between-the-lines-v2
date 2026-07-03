"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const CreateDoodle = async(quoteId, canvasData)=>{
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
redirect(`/book/${quote.book_id}/quote/${quoteId}`);
}
export default CreateDoodle