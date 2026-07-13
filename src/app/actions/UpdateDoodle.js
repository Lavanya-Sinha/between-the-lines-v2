"use server"

import requireWriteAccess from "@/lib/auth/requireWriteAccess"
import requireOwnership from "@/lib/auth/requireOwnership"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { invalidateQuote, invalidateDoodle } from "@/lib/cache/Invalidate"

const UpdateDoodle = async(doodleId, canvasData)=>{
await requireWriteAccess()
const doodle = await requireOwnership("doodles", doodleId);
const updatedDoodle = await prisma.doodles.update({
    where:{
        id: Number.parseInt(doodleId)
    },
    data:{
        canvas_data : canvasData
    }
})
//redis cache invalidation
await invalidateDoodle(updatedDoodle.quote_id)
await invalidateQuote(updatedDoodle.quote_id)

redirect(`/book/${doodle.quote.book.id}/quote/${doodle.quote.id}`);
}
export default UpdateDoodle