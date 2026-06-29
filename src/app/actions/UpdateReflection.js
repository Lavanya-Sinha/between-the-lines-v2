"use server";

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

const UpdateReflection = async(FormData)=>{
const reflectionId = Number.parseInt(FormData.get("reflection_id"))
const quoteId = FormData.get("quote_id")
const bookId = FormData.get("book_id")
const content = FormData.get("content")
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