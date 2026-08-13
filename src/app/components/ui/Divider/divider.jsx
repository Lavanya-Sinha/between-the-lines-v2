"use client";

export default function Divider({
    className = "",
}) {
    return (
        <div
            className={`
                w-full
                ${className}
            `}
            style={{
                borderTop:
                    "var(--border-subtle) solid var(--border)",
            }}
        />
    );
}