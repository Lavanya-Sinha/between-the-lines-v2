"use server";
import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookValidation } from "@/lib/validation/BookValidation";

const CreateBook = async(formData)=>{
    const rawTitle = formData.get("title")
    const rawAuthor = formData.get("author")
    
    const validation = BookValidation({
        title: rawTitle,
        author: rawAuthor
    })
    if(!validation.success){
        throw new Error(validation.error)
    }
    const {title,author} = validation.data

    const user = await requireUser()
    console.log("Running on server...");
    console.log(title, author);

    await prisma.books.create({
        data: {
            title,
            author,
            user:{
                connect:{
                    id : user.id
                }
            }
        }
       
    })
    redirect("/dashboard")
}
export default CreateBook
