// to get the ongoing discussion

import prisma from "../prisma"

const getCurrentDiscussion = async({reflectionId})=>{
return await prisma.discussions.findFirst({
  where: {
    reflection_id: reflectionId,
    ended_at: null,
  },
  orderBy: {
    created_at: "desc",
  },
});
}
export default getCurrentDiscussion