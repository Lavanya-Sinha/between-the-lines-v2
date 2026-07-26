import prisma from "../prisma"
const updateDiscussion = async({discussionId, data})=>{
return await prisma.discussions.update({
    where: {
      id: Number(discussionId),
    },
    data, 
  });
}
export default updateDiscussion