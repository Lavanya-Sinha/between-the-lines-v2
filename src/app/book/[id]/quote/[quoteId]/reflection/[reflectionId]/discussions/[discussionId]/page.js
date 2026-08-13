import getDiscussion from "@/lib/discussions/getDiscussion";
import DiscussionComposer from "@/app/components/DiscussionComposer";
import EndDiscussionButton from "@/app/components/EndDiscussionButton";
import DiscussionRealtime from "@/app/components/DIscussionRealTime";
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

    const discussion =
        await getDiscussion({ discussionId });

    return (
        <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 p-8">

            <header className="flex flex-col gap-4">

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
                    }}
                >
                    {discussion.title}
                </h1>

            </header>

            {/* Context */}

            <Card className="flex flex-col gap-4 p-6">

                <h3
                    style={{
                        fontFamily:
                            "var(--font-heading)",
                        fontSize:
                            "var(--font-size-xl)",
                        fontWeight:
                            "var(--font-weight-semibold)",
                        lineHeight:
                            "var(--line-height-heading)",
                    }}
                >
                    {discussion.reflection.quote.book.title}
                </h3>

                <blockquote
                    className="border-l-4 border-[var(--primary)] pl-4"
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
                    {discussion.reflection.quote.text}
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
                    {discussion.reflection.content}
                </p>

            </Card>

            {/* Discussion */}

            <Card className="flex flex-col gap-6 p-6">

                <DiscussionRealtime
                    discussion={discussion}
                />

            </Card>

            <DiscussionComposer
                discussionId={discussion.id}
            />

            <div className="self-start">

                <EndDiscussionButton
                    discussionId={discussion.id}
                />

            </div>

        </main>
    );
};

export default DiscussionPage;
