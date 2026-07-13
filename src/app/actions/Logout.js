"use server";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/sessions/session";
import { redirect } from "next/navigation";
import log from "@/lib/logging/logger";

const Logout =  async()=>{
try {
    
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("sessionId")
    if(!sessionCookie){
        redirect("/")
    }
    await deleteSession(sessionCookie.value);
    cookieStore.delete("sessionId")
    log({
      level: "INFO",
      file: "src/app/actions/Logout.js",
      operation: "Logout",
      message: "User logged out successfully.",
      userId: session.user_id
    })
    redirect("/")
} catch (error) {
    log({
      level: "ERROR",
      file: "src/app/actions/Logout.js",
      operation: "Logout",
      message: "Unexpected logout failure.",
      error: error.message
   })

   throw error
}
}
export default Logout