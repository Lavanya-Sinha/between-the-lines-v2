"use client"
import startDiscussion from "../actions/discussions/StartDiscussion"
import { useRouter } from "next/navigation";

const AIDiscussionButton = ({reflectionId})=>{
    const router = useRouter();
    const handleDiscussionSave = async()=>{
        const discussion = await startDiscussion({reflectionId})
        console.log(discussion);
        router.push(`/book/${discussion.reflection.quote.book.id}/quote/${discussion.reflection.quote.id}/reflection/${discussion.reflection_id}/discussions/${discussion.id}`)
    }
    return(
        <div>
         <button onClick={handleDiscussionSave}>
            Start Discussion
         </button>
        </div>
    )
}
export default AIDiscussionButton