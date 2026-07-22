// Insert a single message 
import prisma from "../prisma";

const addMessage = async ({discussionId, role, content}) => {
  console.log({discussionId, role, content});

  const data = {
    discussion_id: Number.parseInt(discussionId),
    role,
    content,
  };


  return await prisma.discussion_messages.create({
    data,
  });
};

export default addMessage;