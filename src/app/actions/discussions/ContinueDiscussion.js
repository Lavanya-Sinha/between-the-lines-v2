"use server";

import addMessage from "@/lib/discussions/addMessage";
import companion from "@/lib/ai/companion";
import getDiscussion from "@/lib/discussions/getDiscussion";

const ContinueDiscussion = async({discussionId, message})=>{
 await addMessage({
    discussionId,
    role: "USER",
    content: message
 })

 const aiResponse = await companion({ discussionId })

 await addMessage({
    discussionId,
    role: "ASSISTANT",
    content: aiResponse
 })

 return await getDiscussion({ discussionId })
}
export default ContinueDiscussion