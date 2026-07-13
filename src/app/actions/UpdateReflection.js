"use server";
import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ReflectionValidation } from "@/lib/validation/ReflectionValidation";
import { invalidateQuote, invalidateReflection } from "@/lib/cache/Invalidate";

const UpdateReflection = async(FormData)=>{

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
  await prisma.reflections.update({
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
redirect(`/book/${bookId}/quote/${quoteId}/reflection/${reflectionId}`)
}
export default UpdateReflection