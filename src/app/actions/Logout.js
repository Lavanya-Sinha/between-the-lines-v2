"use server";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/sessions/session";
import { redirect } from "next/navigation";

const Logout =  async()=>{
const cookieStore = await cookies()
const sessionCookie = cookieStore.get("sessionId")
if(!sessionCookie){
    redirect("/")
}
await deleteSession(sessionCookie.value);
cookieStore.delete("sessionId")
redirect("/")
}
export default Logout