"use client";

export default function Card({
    children,
    className = "",
    ...props
}) {
    return (
        <div
            className={`p-6 transition-all ${className}`}
            style={{
                backgroundColor:
                    "var(--surface)",

                color:
                    "var(--text-primary)",

                border:
                    "var(--border-subtle) solid var(--border)",

                borderRadius:
                    "var(--radius-xl)",

                boxShadow:
                    "var(--shadow-card)",

                transition:
                    "var(--transition-card)",
            }}
            {...props}
        >
            {children}
        </div>
    );
}