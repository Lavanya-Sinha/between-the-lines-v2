"use client";

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
        color: "var(--primary-foreground)",
    },

    ghost: {
        backgroundColor: "transparent",
        color: "var(--text-primary)",
    },
};

export default function Button({
    children,
    variant = "primary",
    className = "",
    type = "button",
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                border
                px-4
                py-3
                cursor-pointer
                select-none
                transition-all
                hover:scale-[var(--scale-hover)]
                active:scale-[var(--scale-pressed)]
                ${className}
            `}
            style={{
                ...variants[variant],

                borderColor:
                    variant === "ghost"
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

                transition:
                    "var(--transition-button)",
            }}
            {...props}
        >
            {children}
        </button>
    );
}