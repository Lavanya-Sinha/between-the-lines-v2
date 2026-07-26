"use server"

import addMessage from "@/lib/discussions/addMessage"
import getDiscussion from "@/lib/discussions/getDiscussion"
import createDiscussion from "@/lib/discussions/createDiscussion"
import getReflection from "@/lib/reflections/getReflection"
import companion from "@/lib/ai/companion"
import getActiveDiscussion from "@/lib/discussions/getActiveDiscussion"
import { emitDiscussionMessageCreated } from "@/lib/socket-event"

const startDiscussion = async({reflectionId})=>{
  console.log("Server reflectionId:", reflectionId);
const existingDiscussion = await getActiveDiscussion({ reflectionId });

if (existingDiscussion) {
  return await getDiscussion({
    discussionId: existingDiscussion.id,
  });
}

const reflection = await getReflection({reflectionId});
const discussion = await createDiscussion({reflectionId})

const userMessage = await addMessage({
  discussionId: discussion.id,
  role: "USER",
  content: reflection.content,
});

emitDiscussionMessageCreated(userMessage)

const aiResponse = await companion({
  discussionId: discussion.id
});

const assistantMessage = await addMessage({
  discussionId: discussion.id,
  role: "ASSISTANT",
  content: aiResponse,
});

emitDiscussionMessageCreated(assistantMessage)
return await getDiscussion({discussionId: discussion.id});
}
export default startDiscussion