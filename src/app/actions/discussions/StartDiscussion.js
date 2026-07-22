"use server"

import addMessage from "@/lib/discussions/addMessage"
import getDiscussion from "@/lib/discussions/getDiscussion"
import createDiscussion from "@/lib/discussions/createDiscussion"
import getReflection from "@/lib/reflections/getReflection"
import companion from "@/lib/ai/companion"
import getActiveDiscussion from "@/lib/discussions/getActiveDiscussion"

const startDiscussion = async({reflectionId})=>{
const reflection = await getReflection(reflectionId);
const discussion = await createDiscussion({reflectionId})

const existingDiscussion = await getActiveDiscussion({ reflectionId });

if (existingDiscussion) {
  return await getDiscussion({
    discussionId: existingDiscussion.id,
  });
}

await addMessage({
  discussionId: discussion.id,
  role: "USER",
  content: reflection.content,
});

const aiResponse = await companion({
  discussionId: discussion.id
});

await addMessage({
  discussionId: discussion.id,
  role: "ASSISTANT",
  content: aiResponse,
});

return await getDiscussion({discussionId: discussion.id});
}
export default startDiscussion