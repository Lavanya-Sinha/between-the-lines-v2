"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { invalidateQuote,invalidateDoodle } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const CreateDoodle = async(quoteId, canvasData)=>{
try {
    await requireWriteAccess()
    const quote = await requireOwnership("quotes", quoteId);
   const user = await prisma.doodles.create({
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
    
     log({
      level: "INFO",
      file: "src/app/actions/CreateDoodle.js",
      operation: "Add A Doodle",
      message: "Doodle Added",
      userId: user.id,
    });
    redirect(`/book/${quote.book_id}/quote/${quoteId}`);
    
} catch (error) {
     log({
      level: "ERROR",
      file: "src/app/actions/CreateDoodle.js",
      operation: "Add Doodle",
      message: "Failed to Add Doodle.",
      error: error.message,
    });

    throw error;
}
}
export default CreateDoodle