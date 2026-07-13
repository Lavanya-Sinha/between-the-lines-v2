"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { invalidateQuote, invalidateReflection } from "@/lib/cache/Invalidate";

const DeleteReflection = async(formData)=>{

await requireWriteAccess()
const reflectionId = Number.parseInt(formData.get("reflection_id"))
const quoteId = formData.get("quote_id")
const bookId = formData.get("book_id")
await requireOwnership("reflections", reflectionId)
await prisma.reflections.delete({
    where:{
        id : reflectionId
    }
})
//redis cache invalidation
await invalidateQuote(quoteId)
await invalidateReflection(reflectionId)

redirect(`/book/${bookId}/quote/${quoteId}`)
}
export default DeleteReflection