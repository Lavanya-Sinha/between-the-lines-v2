"use client"

import { useDiscussionSocket } from "../hooks/useDiscussionSocket"

export default function DiscussionRealtime({
    discussionId,
    children,
}) {
    useDiscussionSocket(discussionId);

    return children;
}