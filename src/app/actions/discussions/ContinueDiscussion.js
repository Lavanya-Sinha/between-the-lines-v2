"use server";

import addMessage from "@/lib/discussions/addMessage";
import companion from "@/lib/ai/companion";
import getDiscussion from "@/lib/discussions/getDiscussion";
import generateTitle from "@/lib/ai/generateTitle";
import updateDiscussion from "@/lib/discussions/updateDiscussion";
import { publishRealtimeEvent } from "@/lib/realtime/publisher";
import { EVENTS } from "@/lib/realtime/eventTypes";

const ContinueDiscussion = async({discussionId, message})=>{

 const discussion = await getDiscussion({ discussionId });
 const quoteId = discussion.reflection.quote.id;

const userMessage = await addMessage({
    discussionId,
    role: "USER",
    content: message
 })

 await publishRealtimeEvent({
    room: `quote-${quoteId}`,
    type: EVENTS.DISCUSSION_MESSAGE_CREATED,
    payload: userMessage,
});

 const aiResponse = await companion({ discussionId })

 const assistantMessage = await addMessage({
    discussionId,
    role: "ASSISTANT",
    content: aiResponse
 })

await publishRealtimeEvent({
    room: `quote-${quoteId}`,
    type: EVENTS.DISCUSSION_MESSAGE_CREATED,
    payload: assistantMessage,
});

if (!discussion.title) {
    const title = await generateTitle({ discussionId });

    await updateDiscussion({
        discussionId,
       data: {title},
    });
}
 return await getDiscussion({ discussionId })
}
export default ContinueDiscussion