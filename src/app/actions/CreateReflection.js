"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ReflectionValidation } from "@/lib/validation/ReflectionValidation";

const CreateReflection = async(formData)=>{
    const rawContent = formData.get("content")
    const quoteId = formData.get("quote_id")
    const id = formData.get('book_id')

    const validation = ReflectionValidation({content: rawContent})
    if(!validation.success){
      throw new Error(validation.error)
    }
    const{content} = validation.data

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