import prisma from "../prisma";

const getActiveDiscussion = async ({ reflectionId }) => {
  return await prisma.discussions.findFirst({
    where: {
      reflection_id: Number.parseInt(reflectionId),
      ended_at: null,
    },
     orderBy: {
      created_at: "desc",
    },
    include: {
      reflection: {
        include: {
          quote: {
            include: {
              book: true,
            },
          },
        },
      },
    },
  });
};

export default getActiveDiscussion;