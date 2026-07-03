"use server";
import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const CreateBook = async(formData)=>{
    const user = await requireUser()
    const title = formData.get("title")
    const author = formData.get("author")
    
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