"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContinueDiscussion from "../actions/discussions/ContinueDiscussion";

const DiscussionComposer = ({ discussionId }) => {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (message.trim() === "") return;

    setIsSending(true);

    try {
      await ContinueDiscussion({
        discussionId,
        message,
      });

      setMessage("");
      router.refresh();
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Continue the discussion..."
      />

      <button
        onClick={handleSend}
        disabled={isSending || message.trim() === ""}
      >
        {isSending ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default DiscussionComposer;