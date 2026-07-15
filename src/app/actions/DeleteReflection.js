"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { invalidateQuote, invalidateReflection } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const DeleteReflection = async(formData)=>{
try {
    await requireWriteAccess()
    const reflectionId = Number.parseInt(formData.get("reflection_id"))
    const quoteId = formData.get("quote_id")
    const bookId = formData.get("book_id")
    await requireOwnership("reflections", reflectionId)
    const user =await prisma.reflections.delete({
        where:{
            id : reflectionId
        }
    })
    //redis cache invalidation
    await invalidateQuote(quoteId)
    await invalidateReflection(reflectionId)
    
    log({
      level: "INFO",
      file: "src/app/actions/DeleteReflection.js",
      operation: "Delete Reflection",
      message: "Reflection Deleted",
      userId: user.id,
    });
    redirect(`/book/${bookId}/quote/${quoteId}`)
    
} catch (error) {
      log({
      level: "ERROR",
      file: "src/app/actions/DeleteReflection.js",
      operation: "Delete Reflection",
      message: "Failed to delete the reflection.",
      error: error.message,
    });

    throw error;
}
}
export default DeleteReflection