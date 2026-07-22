"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import EndDiscussion from "../actions/discussions/EndDiscussion";

const EndDiscussionButton = ({discussionId})=>{
     const router = useRouter();
     const [isEnding, setIsEnding] = useState(false);
      const handleEndDiscussion = async () => {
    setIsEnding(true);

    try {
     const discussion = await EndDiscussion({
        discussionId,
      });

      router.push(
        `/book/${discussion.reflection.quote.book.id}/quote/${discussion.reflection.quote.id}/reflection/${discussion.reflection_id}`
      );
    } finally {
      setIsEnding(false);
    }
  };
 return(
<button
      onClick={handleEndDiscussion}
      disabled={isEnding}
    >
      {isEnding ? "Ending..." : "End Discussion"}
    </button>
 )

}
export default EndDiscussionButton