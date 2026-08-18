"use client";

import { useRouter } from "next/navigation";

import Button from "./ui/Button";
import startDiscussion from "../actions/discussions/StartDiscussion";

const AIDiscussionButton = ({
    reflectionId,
}) => {
    const router = useRouter();

    const handleDiscussionSave = async () => {
        const discussion =
            await startDiscussion({
                reflectionId,
            });

        router.push(
            `/book/${discussion.reflection.quote.book.id}/quote/${discussion.reflection.quote.id}/reflection/${discussion.reflection_id}/discussions/${discussion.id}`
        );
    };

    return (
        <Button
            type="button"
            variant="primary"
            onClick={handleDiscussionSave}
        >
            Start Discussion
        </Button>
    );
};

export default AIDiscussionButton;