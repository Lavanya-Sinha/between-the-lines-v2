"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
const DeleteReflection = async(formData)=>{
const reflectionId = Number.parseInt(formData.get("reflection_id"))
const quoteId = formData.get("quote_id")
const bookId = formData.get("book_id")
await prisma.reflections.delete({
    where:{
        id : reflectionId
    }
})
redirect(`/book/${bookId}/quote/${quoteId}`)
}
export default DeleteReflection