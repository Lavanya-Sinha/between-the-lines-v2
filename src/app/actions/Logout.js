"use server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const Logout =  async()=>{
const cookieStore = await cookies()
const sessionCookie = cookieStore.get("sessionId")
if(!sessionCookie){
    redirect("/")
}
const session = await prisma.sessions.findUnique({
    where:{
        session_id : sessionCookie.value
    }
})
if(!session){
redirect("/")
}

await prisma.sessions.delete({
    where:{
        session_id : sessionCookie.value,
    }
})

cookieStore.delete("sessionId")
redirect("/")
}
export default Logout