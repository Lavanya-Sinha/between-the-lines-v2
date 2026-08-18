"use client";

import Spinner from "../Spinner";

export default function LoadingState({
    message = "Loading...",
    size = "40px",
    fullScreen = false,
    className = "",
}) {
    return (
        <div
            className={`
                flex
                w-full
                flex-col
                items-center
                justify-center
                gap-4
                ${
                    fullScreen
                        ? "min-h-screen"
                        : "min-h-40"
                }
                ${className}
            `}
        >
            <Spinner size={size} />

            <p
                style={{
                    fontFamily:
                        "var(--font-body)",

                    fontSize:
                        "var(--font-size-sm)",

                    fontWeight:
                        "var(--font-weight-medium)",

                    lineHeight:
                        "var(--line-height-body)",

                    color:
                        "var(--text-muted)",
                }}
            >
                {message}
            </p>
        </div>
    );
}