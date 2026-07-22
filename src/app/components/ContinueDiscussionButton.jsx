"use client";

import { useRouter } from "next/navigation";

const ContinueDiscussionButton = ({ discussion }) => {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push(
          `/book/${discussion.reflection.quote.book.id}/quote/${discussion.reflection.quote.id}/reflection/${discussion.reflection.id}/discussions/${discussion.id}`
        )
      }
    >
      Continue Discussion
    </button>
  );
};

export default ContinueDiscussionButton;