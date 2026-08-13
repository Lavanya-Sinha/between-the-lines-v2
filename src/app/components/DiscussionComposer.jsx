"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ContinueDiscussion from "../actions/discussions/ContinueDiscussion";

import Button from "./ui/Button";
import Card from "./ui/Card";
import Textarea from "./ui/Textarea";

const DiscussionComposer = ({ discussionId }) => {
    const router = useRouter();

    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

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
        <Card className="flex flex-col gap-6 p-6">

            <Textarea
                value={message}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
                rows={5}
                placeholder="Continue the discussion..."
                className="min-h-32 leading-8"
            />

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