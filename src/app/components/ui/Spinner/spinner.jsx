"use client";

export default function Spinner({
    size = "40px",
    className = "",
}) {
    return (
        <div
            className={`
                animate-spin
                rounded-full
                ${className}
            `}
            style={{
                width: size,
                height: size,

                border:
                    "var(--border-normal) solid var(--surface-secondary)",

                borderTop:
                    "var(--border-normal) solid var(--primary)",

                borderRadius:
                    "var(--radius-pill)",
            }}
        />
    );
}