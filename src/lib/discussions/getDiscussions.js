//retrive all the discussions related to one reflection

import prisma from "../prisma";

const getDiscussions = async({reflectionId})=>{
     return await prisma.discussions.findMany({
        where:{
            reflection_id: Number.parseInt(reflectionId)
        },
        include:{
        messages: true,
        },
        orderBy:{
            created_at: "desc"
        }
     })
}
export default getDiscussions