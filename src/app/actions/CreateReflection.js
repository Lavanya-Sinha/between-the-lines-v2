"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const CreateReflection = async(formData)=>{
    const content = formData.get("content")
    const quoteId = formData.get("quote_id")
    const id = formData.get('book_id')

    await requireOwnership("quotes", quoteId);
    await prisma.reflections.create({
        data: {
            content,
            quote_id : Number.parseInt(quoteId)
        }
    })
     redirect(`/book/${id}/quote/${quoteId}`);
}
export default CreateReflection