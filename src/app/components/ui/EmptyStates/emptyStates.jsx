"use client";

import { useTheme } from "@/context/ThemeContext";

import Card from "../Card";

import SharedIllustration from "../../themes/SharedIllustration";

import { getThemeCopy } from "@/lib/theme/getThemeCopy";

const illustrationMap = {
    books: "empty-bookshelf",
    quotes: "empty-quote",
    reflections: "empty-reflection",
    discussions: "empty-discussion",
    doodles: "empty-doodle",
};

export default function EmptyState({
    type,
    message,
    description,
    action,
    className = "",
}) {
    const { theme } = useTheme();

    const defaultMessage = getThemeCopy(
        theme,
        `emptyStates.${type}`,
        "Nothing here yet."
    );

    const illustration =
        illustrationMap[type];

    return (
        <Card
            className={`
                flex
                flex-col
                items-center
                justify-center
                gap-5
                p-8
                text-center
                ${className}
            `}
        >
            {illustration && (
                <SharedIllustration
                    name={illustration}
                    alt=""
                    width={240}
                    height={240}
                    className="h-48 w-48 object-contain"
                />
            )}

            <div className="flex flex-col gap-2">
                <p
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
                    }}
                >
                    {message ?? defaultMessage}
                </p>

                {description && (
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
                        {description}
                    </p>
                )}
            </div>

            {action && (
                <div className="mt-2">
                    {action}
                </div>
            )}
        </Card>
    );
}