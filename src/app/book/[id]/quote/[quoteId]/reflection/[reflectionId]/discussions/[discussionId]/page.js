import getDiscussion from "@/lib/discussions/getDiscussion";

import DiscussionComposer from "@/app/components/DiscussionComposer";
import EndDiscussionButton from "@/app/components/EndDiscussionButton";
import DiscussionRealtime from "@/app/components/DIscussionRealTime";

import ThemeBackground from "@/app/components/themes/ThemeBackground";
import ThemeAtmosphere from "@/app/components/themes/ThemeAtmosphere";
import ThemeDecoratives from "@/app/components/themes/ThemeDecoratives";

import Link from "next/link";

import Divider from "@/app/components/ui/Divider";
import Card from "@/app/components/ui/Card";

const DiscussionPage = async ({ params }) => {
    const {
        discussionId,
        id,
        quoteId,
        reflectionId,
    } = await params;

    const discussion = await getDiscussion({
        discussionId,
    });

    if (!discussion) {
        return (
            <ThemeBackground>
                <ThemeAtmosphere />

                <main
                    className="
                        relative
                        z-10
                        mx-auto
                        flex
                        min-h-screen
                        max-w-5xl
                        flex-col
                        gap-6
                        px-6
                        py-8
                        sm:px-8
                        lg:py-12
                    "
                >
                    <Link
                        href={`/book/${id}/quote/${quoteId}/reflection/${reflectionId}`}
                        style={{
                            fontFamily:
                                "var(--font-body)",

                            fontSize:
                                "var(--font-size-base)",

                            fontWeight:
                                "var(--font-weight-medium)",

                            lineHeight:
                                "var(--line-height-body)",

                            color:
                                "var(--text-on-background)",
                        }}
                    >
                        ← Back to Reflection
                    </Link>

                    <h1
                        style={{
                            fontFamily:
                                "var(--font-heading)",

                            fontSize:
                                "var(--font-size-3xl)",

                            fontWeight:
                                "var(--font-weight-bold)",

                            lineHeight:
                                "var(--line-height-heading)",

                            color:
                                "var(--text-on-background)",
                        }}
                    >
                        Discussion not found.
                    </h1>
                </main>
            </ThemeBackground>
        );
    }

    return (
        <ThemeBackground>
            <ThemeAtmosphere />

            <ThemeDecoratives />

            <main
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-screen
                    max-w-5xl
                    flex-col
                    gap-8
                    px-6
                    py-8
                    sm:px-8
                    lg:py-12
                "
            >
                <header
                    className="
                        flex
                        flex-col
                        gap-4
                    "
                >
                    <Link
                        href={`/book/${id}/quote/${quoteId}/reflection/${reflectionId}`}
                        style={{
                            fontFamily:
                                "var(--font-body)",

                            fontSize:
                                "var(--font-size-base)",

                            fontWeight:
                                "var(--font-weight-medium)",

                            lineHeight:
                                "var(--line-height-body)",

                            color:
                                "var(--text-on-background)",
                        }}
                    >
                        ← Back to Reflection
                    </Link>

                    <h1
                        style={{
                            fontFamily:
                                "var(--font-heading)",

                            fontSize:
                                "var(--font-size-3xl)",

                            fontWeight:
                                "var(--font-weight-bold)",

                            lineHeight:
                                "var(--line-height-heading)",

                            letterSpacing:
                                "var(--letter-spacing-heading)",

                            color:
                                "var(--text-primary)",
                        }}
                    >
                        {discussion.title}
                    </h1>
                </header>

                {/* Context */}

                <Card
                    className="
                        flex
                        flex-col
                        gap-4
                        p-6
                    "
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
                        }}
                    >
                        {
                            discussion
                                .reflection
                                .quote
                                .book
                                .title
                        }
                    </h2>

                    <blockquote
                        className="
                            border-l-4
                            border-[var(--primary)]
                            pl-4
                        "
                        style={{
                            fontFamily:
                                "var(--font-quote)",

                            fontSize:
                                "var(--font-size-lg)",

                            fontWeight:
                                "var(--font-weight-normal)",

                            lineHeight:
                                "var(--line-height-quote)",

                            color:
                                "var(--text-secondary)",
                        }}
                    >
                        {
                            discussion
                                .reflection
                                .quote
                                .text
                        }
                    </blockquote>

                    <Divider />

                    <p
                        style={{
                            fontFamily:
                                "var(--font-handwriting)",

                            fontSize:
                                "var(--font-size-lg)",

                            fontWeight:
                                "var(--font-weight-regular)",

                            lineHeight:
                                "var(--line-height-body)",

                            color:
                                "var(--text-primary)",
                        }}
                    >
                        {
                            discussion
                                .reflection
                                .content
                        }
                    </p>
                </Card>

                {/* Discussion */}

                <Card
                    className="
                        flex
                        flex-col
                        gap-6
                        p-6
                    "
                >
                    <DiscussionRealtime
                        discussion={discussion}
                    />
                </Card>

                <DiscussionComposer
                    discussionId={discussion.id}
                />

                <div className="self-start">
                    <EndDiscussionButton
                        discussionId={
                            discussion.id
                        }
                    />
                </div>
            </main>
        </ThemeBackground>
    );
};

export default DiscussionPage;