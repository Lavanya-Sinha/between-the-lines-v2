"use server"

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import requireWriteAccess from "@/lib/auth/requireWriteAccess"
import requireOwnership from "@/lib/auth/requireOwnership"
import { invalidateQuote, invalidateDoodle } from "@/lib/cache/Invalidate"

const DeleteDoodle = async(formData)=>{
const quoteId = formData.get("quoteId");
const id = formData.get("id")
await requireWriteAccess()
await requireOwnership("quotes",quoteId)
await prisma.doodles.delete({
    where: {
        quote_id: Number.parseInt(quoteId)
    }
})
//redis cache invalidation
await invalidateDoodle(quoteId)
await invalidateQuote(quoteId)

redirect(`/book/${id}/quote/${quoteId}`);
}
export default DeleteDoodle