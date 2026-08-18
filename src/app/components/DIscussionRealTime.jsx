"use client";

import { useState } from "react";

import { useDiscussionSocket } from "../hooks/useDiscussionSocket";

export default function DiscussionRealtime({
    discussion,
}) {
    const [messages, setMessages] =
        useState(discussion.messages);

    useDiscussionSocket({
        setMessages,
    });

    return (
        <div
            className="
                flex
                flex-col
                gap-6
            "
        >
            {messages.map((message) => {
                const isUser =
                    message.role === "USER";

                const sender = isUser
                    ? "You"
                    : "Between the Lines";

                return (
                    <div
                        key={message.id}
                        className={`
                            flex
                            ${
                                isUser
                                    ? "justify-end"
                                    : "justify-start"
                            }
                        `}
                    >
                        <article
                            className="
                                flex
                                max-w-[80%]
                                flex-col
                                gap-2
                                p-4
                            "
                            style={{
                                backgroundColor:
                                    isUser
                                        ? "var(--primary)"
                                        : "var(--surface)",

                                color:
                                    isUser
                                        ? "var(--primary-foreground)"
                                        : "var(--text-primary)",

                                border:
                                    "var(--border-subtle) solid var(--border)",

                                borderRadius:
                                    "var(--radius-xl)",

                                boxShadow:
                                    "var(--shadow-card)",

                                transition:
                                    "var(--transition-card)",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily:
                                        "var(--font-body)",

                                    fontWeight:
                                        "var(--font-weight-semibold)",

                                    fontSize:
                                        "var(--font-size-sm)",

                                    lineHeight:
                                        "var(--line-height-body)",
                                }}
                            >
                                {sender}
                            </p>

                            <p
                                style={{
                                    fontFamily:
                                        "var(--font-body)",

                                    fontSize:
                                        "var(--font-size-base)",

                                    fontWeight:
                                        "var(--font-weight-regular)",

                                    lineHeight:
                                        "var(--line-height-body)",
                                }}
                            >
                                {message.content}
                            </p>
                        </article>
                    </div>
                );
            })}
        </div>
    );
}