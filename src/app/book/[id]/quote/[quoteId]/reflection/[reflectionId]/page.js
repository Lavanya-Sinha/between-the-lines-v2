import Link from "next/link";

import DeleteReflection from "@/app/actions/DeleteReflection";

import getReflection from "@/lib/reflections/getReflection";
import getActiveDiscussion from "@/lib/discussions/getActiveDiscussion";
import requireSearchAccess from "@/lib/auth/requireSearchAccess";

import Search from "@/app/components/Search";
import AIDiscussionButton from "@/app/components/AIDiscussionButton";
import ContinueDiscussionButton from "@/app/components/ContinueDiscussionButton";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Divider from "@/app/components/ui/Divider";

const ReflectionPage = async ({ params, searchParams }) => {
    await requireSearchAccess();

    const searchContent = await searchParams;
    const searchDiscussion =
        searchContent.search ?? "";

    const { id, quoteId, reflectionId } =
        await params;

    const reflection = await getReflection({
        reflectionId,
        searchDiscussion,
    });

    const activeDiscussion =
        await getActiveDiscussion({
            reflectionId,
        });

    const discussions =
        reflection.discussions;

    const completedDiscussions =
        discussions.filter(
            (discussion) =>
                discussion.ended_at !== null
        );

    return (
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 p-8">

            <header className="flex flex-col gap-4">

                <Link
                    href={`/book/${id}/quote/${quoteId}`}
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
                    ← Back to Quote
                </Link>

                <Search
                    action={`/book/${id}/quote/${quoteId}/reflection/${reflectionId}`}
                    placeholder="Search your discussions..."
                    queryName="search"
                    defaultValue={searchDiscussion}
                />

                <div className="flex flex-wrap gap-4">

                    <Link
                        href={`/book/${id}/quote/${quoteId}/reflection/${reflectionId}/edit-reflection`}
                    >
                        <Button>
                            Edit Reflection
                        </Button>
                    </Link>

                    <form action={DeleteReflection}>

                        <input
                            type="hidden"
                            name="reflection_id"
                            value={reflection.id}
                        />

                        <input
                            type="hidden"
                            name="quote_id"
                            value={reflection.quote_id}
                        />

                        <input
                            type="hidden"
                            name="book_id"
                            value={id}
                        />

                        <Button variant="danger">
                            Delete Reflection
                        </Button>

                    </form>

                </div>

            </header>

            {/* Book information */}

            <Card className="flex flex-col gap-2 p-6">

                <h2
                    style={{
                        fontFamily:
                            "var(--font-heading)",
                        fontSize:
                            "var(--font-size-2xl)",
                        fontWeight:
                            "var(--font-weight-semibold)",
                        lineHeight:
                            "var(--line-height-heading)",
                    }}
                >
                    {reflection.quote.book.title}
                </h2>

                <p
                    style={{
                        fontFamily:
                            "var(--font-body)",
                        fontSize:
                            "var(--font-size-base)",
                        lineHeight:
                            "var(--line-height-body)",
                        color:
                            "var(--text-muted)",
                    }}
                >
                    {reflection.quote.book.author}
                </p>

            </Card>

            {/* Original quote */}

            <Card className="p-6">

                <blockquote
                    className="border-l-4 border-[var(--primary)] pl-6"
                    style={{
                        fontFamily:
                            "var(--font-quote)",
                        fontSize:
                            "var(--font-size-xl)",
                        fontWeight:
                            "var(--font-weight-normal)",
                        lineHeight:
                            "var(--line-height-quote)",
                        color:
                            "var(--text-primary)",
                    }}
                >
                    {reflection.quote.text}
                </blockquote>

            </Card>

            {/* Reflection */}

            <Card className="flex flex-col gap-6 p-10">

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
                    Your Reflection
                </h1>

                <Divider />

                <p
                    style={{
                        fontFamily:
                            "var(--font-handwriting)",
                        fontSize:
                            "var(--font-size-xl)",
                        fontWeight:
                            "var(--font-weight-regular)",
                        lineHeight:
                            "var(--line-height-body)",
                        color:
                            "var(--text-primary)",
                    }}
                >
                    {reflection.content}
                </p>

                <p
                    style={{
                        fontFamily:
                            "var(--font-body)",
                        fontSize:
                            "var(--font-size-sm)",
                        fontWeight:
                            "var(--font-weight-normal)",
                        lineHeight:
                            "var(--line-height-body)",
                        color:
                            "var(--text-muted)",
                    }}
                >
                    Written on{" "}
                    {new Date(
                        reflection.created_at
                    ).toDateString()}
                </p>

            </Card>

            {/* Discussion */}

            <Card className="flex flex-col gap-6 p-6">

                <h2
                    style={{
                        fontFamily:
                            "var(--font-heading)",
                        fontSize:
                            "var(--font-size-2xl)",
                        fontWeight:
                            "var(--font-weight-semibold)",
                        lineHeight:
                            "var(--line-height-heading)",
                    }}
                >
                    Discussion
                </h2>

                <div className="self-start">

                    {activeDiscussion ? (
                        <ContinueDiscussionButton
                            discussion={
                                activeDiscussion
                            }
                        />
                    ) : (
                        <AIDiscussionButton
                            reflectionId={
                                reflection.id
                            }
                        />
                    )}

                </div>

            </Card>

            {/* Previous discussions */}

            <Card className="flex flex-col gap-6 p-6">

                <h2
                    style={{
                        fontFamily:
                            "var(--font-heading)",
                        fontSize:
                            "var(--font-size-2xl)",
                        fontWeight:
                            "var(--font-weight-semibold)",
                        lineHeight:
                            "var(--line-height-heading)",
                    }}
                >
                    Previous Discussions
                </h2>

                {completedDiscussions.length === 0 ? (

                    <p
                        style={{
                            fontFamily:
                                "var(--font-body)",
                            fontSize:
                                "var(--font-size-base)",
                            lineHeight:
                                "var(--line-height-body)",
                        }}
                    >
                        No previous discussions yet.
                    </p>

                ) : (

                    completedDiscussions.map(
                        (discussion) => (

                            <Link
                                key={discussion.id}
                                href={`/book/${id}/quote/${quoteId}/reflection/${reflectionId}/discussions/${discussion.id}`}
                            >
                                <Card className="flex flex-col gap-2 p-4">

                                    <p
                                        style={{
                                            fontFamily:
                                                "var(--font-body)",
                                            fontSize:
                                                "var(--font-size-base)",
                                            fontWeight:
                                                "var(--font-weight-semibold)",
                                            lineHeight:
                                                "var(--line-height-body)",
                                        }}
                                    >
                                        {discussion.title}
                                    </p>

                                    <p
                                        style={{
                                            fontFamily:
                                                "var(--font-body)",
                                            fontSize:
                                                "var(--font-size-sm)",
                                            lineHeight:
                                                "var(--line-height-body)",
                                            color:
                                                "var(--text-muted)",
                                        }}
                                    >
                                        {new Date(
                                            discussion.created_at
                                        ).toLocaleDateString()}
                                    </p>

                                    <p
                                        style={{
                                            fontFamily:
                                                "var(--font-body)",
                                            fontSize:
                                                "var(--font-size-sm)",
                                            lineHeight:
                                                "var(--line-height-body)",
                                        }}
                                    >
                                        {
                                            discussion
                                                .messages
                                                .length
                                        }{" "}
                                        messages
                                    </p>

                                </Card>
                            </Link>

                        )
                    )

                )}

            </Card>

        </main>
    );
};

export default ReflectionPage;
