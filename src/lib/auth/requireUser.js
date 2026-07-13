import { redirect } from "next/navigation"
import getCurrentUser from "./auth"

const requireUser = async()=>{
    
    const user = await getCurrentUser()
    if(!user){
        redirect("./login")
    }
    return user

}
export default requireUser