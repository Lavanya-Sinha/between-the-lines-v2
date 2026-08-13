"use client";

import { useRouter } from "next/navigation";

import Button from "@/app/components/ui/Button";

const ContinueDiscussionButton = ({
    discussion,
}) => {
    const router = useRouter();

    return (
        <Button
            onClick={() =>
                router.push(
                    `/book/${discussion.reflection.quote.book.id}/quote/${discussion.reflection.quote.id}/reflection/${discussion.reflection.id}/discussions/${discussion.id}`
                )
            }
        >
            Continue Discussion
        </Button>
    );
};

export default ContinueDiscussionButton;