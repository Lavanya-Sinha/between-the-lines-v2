"use server"
import requireOwnership from "@/lib/auth/requireOwnership"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

const UpdateDoodle = async(doodleId, canvasData)=>{
const doodle = await requireOwnership("doodles", doodleId);
await prisma.doodles.update({
    where:{
        id: Number.parseInt(doodleId)
    },
    data:{
        canvas_data : canvasData
    }
})
redirect(`/book/${doodle.quote.book.id}/quote/${doodle.quote.id}`);
}
export default UpdateDoodle