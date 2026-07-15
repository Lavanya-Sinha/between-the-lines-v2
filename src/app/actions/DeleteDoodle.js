"use server"

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import requireWriteAccess from "@/lib/auth/requireWriteAccess"
import requireOwnership from "@/lib/auth/requireOwnership"
import { invalidateQuote, invalidateDoodle } from "@/lib/cache/Invalidate"
import log from "@/lib/logging/logger"

const DeleteDoodle = async(formData)=>{
try {
    const quoteId = formData.get("quoteId");
    const id = formData.get("id")
    await requireWriteAccess()
    await requireOwnership("quotes",quoteId)
    const user = await prisma.doodles.delete({
        where: {
            quote_id: Number.parseInt(quoteId)
        }
    })
    //redis cache invalidation
    await invalidateDoodle(quoteId)
    await invalidateQuote(quoteId)
    
    log({
      level: "INFO",
      file: "src/app/actions/DeleteDoodle.js",
      operation: "Delete Doodle",
      message: "Doodle Deleted",
      userId: user.id,
    });
    redirect(`/book/${id}/quote/${quoteId}`);
    
} catch (error) {
    log({
      level: "ERROR",
      file: "src/app/actions/DeleteDoodle.js",
      operation: "Delete Doodle",
      message: "Failed to delete the doodle.",
      error: error.message,
    });

    throw error;
}
}
export default DeleteDoodle