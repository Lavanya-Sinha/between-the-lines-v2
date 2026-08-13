"use client";

export default function Badge({
    children,
    className = "",
    ...props
}) {
    return (
        <span
            className={`
                inline-flex
                items-center
                justify-center
                px-3
                py-1
                select-none
                transition-all
                ${className}
            `}
            style={{
               
                backgroundColor:
                    "var(--surface-secondary)",

                color:
                    "var(--text-primary)",

                
                border:
                    "var(--border-subtle) solid var(--border)",

                
                fontFamily:
                    "var(--font-body)",

                fontSize:
                    "var(--font-size-sm)",

                fontWeight:
                    "var(--font-weight-medium)",

             
                borderRadius:
                    "var(--radius-pill)",

                boxShadow: "none",

                transitionDuration:
                    "var(--motion-fast)",

                transitionTimingFunction:
                    "var(--motion-easing-standard)",
            }}
            {...props}
        >
            {children}
        </span>
    );
}