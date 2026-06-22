"use server";
import prisma from "@/lib/prisma";

const CreateBook = async(formData)=>{
    const title = formData.get("title")
    const author = formData.get("author")
    
    console.log("Running on server...");
    console.log(title, author);

    await prisma.books.create({
        data: {
            title,
            author
        }
    })
}
export default CreateBook