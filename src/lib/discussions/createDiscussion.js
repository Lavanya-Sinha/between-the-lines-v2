// This file creates a new discussion for a reflection

import prisma from "../prisma";

const createDiscussion = async({reflectionId})=>{
return await prisma.discussions.create({
    data:{
        reflection_id : reflectionId
    }
})
}
export default createDiscussion