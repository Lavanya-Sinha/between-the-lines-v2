"use client";

import Card from "./ui/Card";

export default function BookCard({
    title,
    author,
    className = "",
}) {
    return (
        <Card
            className={`
                flex
                flex-col
                gap-2
                transition-all
                ${className}
            `}
        >
            <h2
                style={{
                    fontFamily:
                        "var(--font-heading)",

                    fontSize:
                        "var(--font-size-xl)",

                    fontWeight:
                        "var(--font-weight-semibold)",

                    lineHeight:
                        "var(--line-height-heading)",

                    color:
                        "var(--text-primary)",

                    letterSpacing:
                        "var(--letter-spacing-heading)",
                }}
            >
                {title}
            </h2>

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

                    color:
                        "var(--text-secondary)",
                }}
            >
                {author}
            </p>
        </Card>
    );
}