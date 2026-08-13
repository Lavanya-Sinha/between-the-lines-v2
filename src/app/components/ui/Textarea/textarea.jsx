"use client";

export default function Textarea({
    className = "",
    rows = 5,
    ...props
}) {
    return (
        <textarea
            rows={rows}
            className={`
                w-full
                px-4
                py-3
                outline-none
                resize-none
                transition-all
                ${className}
            `}
            style={{
                backgroundColor:
                    "var(--surface)",

                color:
                    "var(--text-primary)",

                border:
                    "var(--border-subtle) solid var(--border)",

                fontFamily:
                    "var(--font-body)",

                fontSize:
                    "var(--font-size-base)",

                fontWeight:
                    "var(--font-weight-regular)",

                lineHeight:
                    "var(--line-height-body)",

                borderRadius:
                    "var(--radius-lg)",

                boxShadow:
                    "var(--shadow-inset)",

                transitionDuration:
                    "var(--motion-fast)",

                transitionTimingFunction:
                    "var(--motion-easing-standard)",
            }}
            {...props}
        />
    );
}