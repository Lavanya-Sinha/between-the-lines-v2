"use client";

import { useEffect } from "react";
import { useSocket } from "../components/QuoteRealTImeProvider";
import { EVENTS } from "@/lib/realtime/eventTypes";

export function useDiscussionSocket({ setMessages }) {
    const socket = useSocket();

    useEffect(() => {
        function handleMessage(message) {
            setMessages((prev) => {
                if (prev.some((m) => m.id === message.id)) {
                    return prev;
                }

                return [...prev, message];
            });
        }

        socket.on(
            EVENTS.DISCUSSION_MESSAGE_CREATED,
            handleMessage
        );

        return () => {
            socket.off(
                EVENTS.DISCUSSION_MESSAGE_CREATED,
                handleMessage
            );
        };
    }, [socket, setMessages]);
}