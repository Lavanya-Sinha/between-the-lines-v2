"use client";

import Spinner from "../Spinner";

const variants = {
    primary: {
        backgroundColor: "var(--primary)",
        color: "var(--primary-foreground)",
    },

    secondary: {
        backgroundColor: "var(--secondary)",
        color: "var(--secondary-foreground)",
    },

    danger: {
        backgroundColor: "var(--danger)",
        color: "white",
    },

    ghost: {
        backgroundColor: "transparent",
        color: "var(--text-primary)",
    },

    ghostBackground: {
        backgroundColor: "transparent",
        color: "var(--text-on-background)",
    },
};

export default function Button({
    children,
    variant = "primary",
    className = "",
    type = "button",
    loading = false,
    disabled = false,
    ...props
}) {
    const isDisabled = loading || disabled;

    return (
        <button
            type={type}
            disabled={isDisabled}
            aria-busy={loading}
            className={`inline-flex items-center justify-center gap-2 border px-4 py-3 cursor-pointer select-none transition-all disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
            style={{
                ...variants[variant],

                borderColor:
                    variant === "ghost" ||
                    variant === "ghostBackground"
                        ? "var(--border)"
                        : variants[variant]
                              .backgroundColor,

                fontFamily:
                    "var(--font-body)",

                fontSize:
                    "var(--font-size-base)",

                fontWeight:
                    "var(--font-weight-semibold)",

                borderRadius:
                    "var(--radius-lg)",

                boxShadow:
                    "var(--shadow-button)",

                transitionDuration:
                    "var(--motion-fast)",

                transitionTimingFunction:
                    "var(--motion-easing-standard)",
            }}
            {...props}
        >
            {loading && (
                <Spinner size="18px" />
            )}

            {children}
        </button>
    );
}