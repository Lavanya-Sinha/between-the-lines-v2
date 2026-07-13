import { cookies } from "next/headers"
import prisma from "../prisma"
import { getSession } from "../sessions/session"
import log from "../logging/logger"

const getCurrentUser = async()=>{
try { 
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("sessionId")
    if(!sessionCookie){
     return null
    }
    const userId = await getSession(sessionCookie.value)
    if(!userId){
        return null
    }
    
    const user = await prisma.users.findUnique({
        where : {
            id : Number.parseInt(userId)
        }
    })
    if(!user){
        return null
    }
    return user
} catch (error) {
    log({
        level:"ERROR",
        file:"src/lib/auth/auth.js",
        operation:"Get Current User",
        message:"Failed to retrieve current user.",
        error:error.message
    })

    throw error
}

}
export default getCurrentUser