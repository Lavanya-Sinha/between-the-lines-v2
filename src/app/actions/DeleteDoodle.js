"use server"

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import requireOwnership from "@/lib/auth/requireOwnership"

const DeleteDoodle = async(formData)=>{
const quoteId = formData.get("quoteId");
const id = formData.get("id")
await requireOwnership("quotes",quoteId)
await prisma.doodles.delete({
    where: {
        quote_id: Number.parseInt(quoteId)
    }
})
redirect(`/book/${id}/quote/${quoteId}`);
}
export default DeleteDoodle