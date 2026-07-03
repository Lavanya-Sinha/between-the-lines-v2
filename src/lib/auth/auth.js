import { cookies } from "next/headers"
import prisma from "../prisma"

const getCurrentUser = async()=>{
const cookieStore = await cookies()
const sessionCookie = cookieStore.get("sessionId")
if(!sessionCookie){
 return null
}
const session = await prisma.sessions.findUnique({
    where : {
        session_id : sessionCookie.value
    }
})
if(!session){
    return null
}
const now = new Date();

if (session.expires_at <= now) {
    await prisma.sessions.delete({
        where:{
            session_id : session.session_id
        }
    })
    return null
}

const user = await prisma.users.findUnique({
    where : {
        id : session.user_id
    }
})
if(!user){
    return null
}
return user

}
export default getCurrentUser