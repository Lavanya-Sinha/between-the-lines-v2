"use server"

import addMessage from "@/lib/discussions/addMessage"
import getDiscussion from "@/lib/discussions/getDiscussion"
import createDiscussion from "@/lib/discussions/createDiscussion"
import getReflection from "@/lib/reflections/getReflection"
import companion from "@/lib/ai/companion"
import getActiveDiscussion from "@/lib/discussions/getActiveDiscussion"
import { publishRealtimeEvent } from "@/lib/realtime/publisher";
import { EVENTS } from "@/lib/realtime/eventTypes";


const startDiscussion = async({reflectionId})=>{
const existingDiscussion = await getActiveDiscussion({ reflectionId });

if (existingDiscussion) {
  return await getDiscussion({
    discussionId: existingDiscussion.id,
  });
}

const reflection = await getReflection({reflectionId});
const discussion = await createDiscussion({reflectionId})
const quoteId = reflection.quote.id;

const userMessage = await addMessage({
  discussionId: discussion.id,
  role: "USER",
  content: reflection.content,
});

 await publishRealtimeEvent({
    room: `quote-${quoteId}`,
    type: EVENTS.DISCUSSION_MESSAGE_CREATED,
    payload: userMessage,
});


const aiResponse = await companion({
  discussionId: discussion.id
});

const assistantMessage = await addMessage({
  discussionId: discussion.id,
  role: "ASSISTANT",
  content: aiResponse,
});

await publishRealtimeEvent({
    room: `quote-${quoteId}`,
    type: EVENTS.DISCUSSION_MESSAGE_CREATED,
    payload: assistantMessage,
});
return await getDiscussion({discussionId: discussion.id});
}
export default startDiscussion