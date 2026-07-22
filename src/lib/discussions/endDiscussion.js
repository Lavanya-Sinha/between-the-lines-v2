// used to notify db when the discussion is ended

import prisma from "../prisma";

const endDiscussion = async({discussionId})=>{
    return await prisma.discussions.update({
        where:{
            id: Number.parseInt(discussionId)
        },
        data:{
            ended_at : new Date()
        }
    })
}
export default endDiscussion