"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ContinueDiscussion from "../actions/discussions/ContinueDiscussion";

import Button from "./ui/Button";
import Card from "./ui/Card";
import Textarea from "./ui/Textarea";

const DiscussionComposer = ({
    discussionId,
}) => {
    const router = useRouter();

    const [message, setMessage] =
        useState("");

    const [isSending, setIsSending] =
        useState(false);

    const handleSend = async () => {
        if (message.trim() === "") {
            return;
        }

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
        <Card
            className="
                flex
                flex-col
                gap-6
                p-6
            "
        >
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="discussion-message"
                    style={{
                        fontFamily:
                            "var(--font-body)",

                        fontSize:
                            "var(--font-size-sm)",

                        fontWeight:
                            "var(--font-weight-semibold)",

                        lineHeight:
                            "var(--line-height-body)",

                        color:
                            "var(--text-primary)",
                    }}
                >
                    Continue the discussion
                </label>

                <Textarea
                    id="discussion-message"
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    rows={5}
                    placeholder="Share your thoughts..."
                    className="min-h-32 leading-8"
                />
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={handleSend}
                    disabled={
                        isSending ||
                        message.trim() === ""
                    }
                >
                    {isSending
                        ? "Thinking..."
                        : "Send"}
                </Button>
            </div>
        </Card>
    );
};

export default DiscussionComposer;