//retrive a single discussion with all of it's messages

import prisma from "../prisma";

const getDiscussion = async ({ discussionId }) => {
  return await prisma.discussions.findUnique({
    where: {
      id: Number.parseInt(discussionId),
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

      messages: {
        orderBy: {
          created_at: "asc",
        },
      },
    },
  });
};
export default getDiscussion;
