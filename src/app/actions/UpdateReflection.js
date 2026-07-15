"use server";
import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ReflectionValidation } from "@/lib/validation/ReflectionValidation";
import { invalidateQuote, invalidateReflection } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const UpdateReflection = async(FormData)=>{
try {
  await requireWriteAccess()
const reflectionId = Number.parseInt(FormData.get("reflection_id"))
const quoteId = FormData.get("quote_id")
const bookId = FormData.get("book_id")
const originalContent = FormData.get("content")

const validation = ReflectionValidation({content : originalContent})
if(!validation.success){
  throw new Error(validation.error)
}
const{content} = validation.data

await requireOwnership("reflections", reflectionId)
 const user = await prisma.reflections.update({
  where : {
    id : reflectionId
  }, 
  data : {
    content,
  }
})
//redis cache invalidation 
await invalidateQuote(quoteId)
await invalidateReflection(reflectionId)

 log({
      level: "INFO",
      file: "src/app/actions/UpdateReflection.js",
      operation: "Update Reflection",
      message: "Reflection Updated.",
      userId: user.id,
    });
redirect(`/book/${bookId}/quote/${quoteId}/reflection/${reflectionId}`)
  
} catch (error) {
  log({
      level: "ERROR",
      file: "src/app/actions/UpdateReflection.js",
      operation: "Update Reflection",
      message: "Failed to update reflection.",
      error: error.message,
    });

    throw error;
}
}
export default UpdateReflection