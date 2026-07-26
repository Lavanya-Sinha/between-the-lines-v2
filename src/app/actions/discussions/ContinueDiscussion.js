"use server";

import addMessage from "@/lib/discussions/addMessage";
import companion from "@/lib/ai/companion";
import getDiscussion from "@/lib/discussions/getDiscussion";
import generateTitle from "@/lib/ai/generateTitle";
import updateDiscussion from "@/lib/discussions/updateDiscussion";
import { emitDiscussionMessageCreated } from "@/lib/socket-event";

const ContinueDiscussion = async({discussionId, message})=>{
const userMessage = await addMessage({
    discussionId,
    role: "USER",
    content: message
 })

 emitDiscussionMessageCreated(userMessage)

 const aiResponse = await companion({ discussionId })

 const assistantMessage = await addMessage({
    discussionId,
    role: "ASSISTANT",
    content: aiResponse
 })

emitDiscussionMessageCreated(assistantMessage)

 const discussion = await getDiscussion({ discussionId });

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