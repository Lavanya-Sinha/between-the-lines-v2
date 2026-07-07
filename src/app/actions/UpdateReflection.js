"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ReflectionValidation } from "@/lib/validation/ReflectionValidation";

const UpdateReflection = async(FormData)=>{
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
redirect(`/book/${bookId}/quote/${quoteId}/reflection/${reflectionId}`)
}
export default UpdateReflection