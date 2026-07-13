import { cookies } from "next/headers"
import prisma from "../prisma"
import { getSession } from "../sessions/session"

const getCurrentUser = async()=>{
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

}
export default getCurrentUser