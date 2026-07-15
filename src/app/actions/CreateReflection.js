"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ReflectionValidation } from "@/lib/validation/ReflectionValidation";
import { invalidateQuote } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const CreateReflection = async(formData)=>{
try {
    const rawContent = formData.get("content")
    const quoteId = formData.get("quote_id")
    const id = formData.get('book_id')

    const validation = ReflectionValidation({content: rawContent})
    if(!validation.success){
      throw new Error(validation.error)
    }
    const{content} = validation.data

    await requireWriteAccess()

    await requireOwnership("quotes", quoteId);
    const user = await prisma.reflections.create({
        data: {
            content,
            quote_id : Number.parseInt(quoteId)
        }
    })
    //redis cache invalidation
    await invalidateQuote(quoteId)
    log({
      level: "INFO",
      file: "src/app/actions/CreateReflection.js",
      operation: "Add A Reflection",
      message: "Reflection Added",
      userId: user.id,
    });
     redirect(`/book/${id}/quote/${quoteId}`);
    
} catch (error) {
    log({
      level: "ERROR",
      file: "src/app/actions/CreateReflection.js",
      operation: "Add Reflection",
      message: "Failed to Add The Reflection.",
      error: error.message,
    });

    throw error;
}
}
export default CreateReflection