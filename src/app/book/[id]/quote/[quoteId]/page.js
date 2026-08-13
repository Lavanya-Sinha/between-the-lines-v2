import requireSearchAccess from "@/lib/auth/requireSearchAccess";

import AddMoodTag from "@/app/actions/AddMoodTag";
import DeleteQuote from "@/app/actions/DeleteQuote";
import RemoveMoodTag from "@/app/actions/RemoveMoodTag";

import Link from "next/link";

import DoodlePreview from "@/app/components/DoodlePreview";
import AttachmentsClient from "./attachments/AttachmentsClient";
import { AttachmentRenderer } from "@/app/components/AttachmentRenderer";
import Search from "@/app/components/Search";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Divider from "@/app/components/ui/Divider";
import Input from "@/app/components/ui/Input";

import getQuote from "@/lib/quotes/getQuote";

const QuotePage = async ({ params, searchParams }) => {
    await requireSearchAccess();

    const searchContent = await searchParams;
    const searchReflection =
        searchContent.search ?? "";

    const { id, quoteId } = await params;

    const quote = await getQuote({
        quoteId,
        searchReflection,
    });

    if (!quote) {
        return (
            <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-8">

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
                    Quote not found.
                </h1>

                <Link
                    href={`/book/${id}`}
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
                    ← Back to book
                </Link>

            </main>
        );
    }

    return (
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 p-8">

            <header className="flex flex-col gap-6">

                <Link
                    href={`/book/${id}`}
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
                    ← Back to Book
                </Link>

                <Search
                    action={`/book/${id}/quote/${quoteId}`}
                    placeholder="Search your reflections..."
                    queryName="search"
                    defaultValue={searchReflection}
                />

                <div className="flex flex-wrap gap-4">

                    <Link
                        href={`/book/${id}/quote/${quoteId}/edit-quote`}
                    >
                        <Button>
                            Edit Quote
                        </Button>
                    </Link>

                    <form action={DeleteQuote}>

                        <input
                            type="hidden"
                            name="quote_id"
                            value={quote.id}
                        />

                        <input
                            type="hidden"
                            name="book_id"
                            value={id}
                        />

                        <Button variant="danger">
                            Delete Quote
                        </Button>

                    </form>

                </div>

            </header>

            {/* Quote */}

            <Card className="flex flex-col gap-6 p-8">

                <blockquote
                    className="border-l-4 border-[var(--primary)] pl-6"
                    style={{
                        fontFamily:
                            "var(--font-quote)",

                        fontSize:
                            "var(--font-size-2xl)",

                        fontWeight:
                            "var(--font-weight-normal)",

                        lineHeight:
                            "var(--line-height-quote)",

                        color:
                            "var(--text-primary)",
                    }}
                >
                    {quote.text}
                </blockquote>

            </Card>

            <Divider />

            {/* Mood Tags */}

            <section className="flex flex-col gap-6">

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

                        letterSpacing:
                            "var(--letter-spacing-heading)",
                    }}
                >
                    Mood Tags
                </h2>

                <form
                    action={AddMoodTag}
                    className="flex flex-wrap gap-4"
                >
                    <Input
                        type="text"
                        name="tag_name"
                        placeholder="Add mood tag..."
                    />

                    <input
                        type="hidden"
                        name="quote_id"
                        value={quote.id}
                    />

                    <input
                        type="hidden"
                        name="book_id"
                        value={id}
                    />

                    <Button>
                        Add Tag
                    </Button>
                </form>

                <div className="flex flex-wrap gap-4">

                    {quote.mood_tags.map((tag) => (
                        <Card
                            key={tag.id}
                            className="flex items-center gap-4 p-4"
                        >
                            <p
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
                                {tag.name}
                            </p>

                            <form action={RemoveMoodTag}>

                                <input
                                    type="hidden"
                                    name="quote_id"
                                    value={quote.id}
                                />

                                <input
                                    type="hidden"
                                    name="tag_id"
                                    value={tag.id}
                                />

                                <input
                                    type="hidden"
                                    name="book_id"
                                    value={id}
                                />

                                <Button variant="ghost">
                                    Remove
                                </Button>

                            </form>

                        </Card>
                    ))}

                </div>

            </section>

            <Divider />

            {/* Doodle */}

            <section className="flex flex-col gap-6">

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

                        letterSpacing:
                            "var(--letter-spacing-heading)",
                    }}
                >
                    Doodle
                </h2>

                {quote.doodle ? (

                    <Link
                        href={`/book/${id}/quote/${quote.id}/doodle`}
                    >
                        <DoodlePreview
                            canvasData={
                                quote.doodle.canvas_data
                            }
                        />
                    </Link>

                ) : (

                    <Card className="flex flex-col gap-4">

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
                            No doodle yet.
                        </p>

                        <Link
                            href={`/book/${id}/quote/${quote.id}/doodle`}
                        >
                            <Button>
                                Create Doodle
                            </Button>
                        </Link>

                    </Card>

                )}

            </section>

            <Divider />

            {/* Attachments */}

            <section className="flex flex-col gap-6">

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

                        letterSpacing:
                            "var(--letter-spacing-heading)",
                    }}
                >
                    Attachments
                </h2>

                <AttachmentsClient
                    quoteId={quote.id}
                    id={id}
                />

                {quote.attachments.length === 0 ? (

                    <Card className="flex flex-col gap-4">

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
                            No attachments yet.
                        </p>

                        <p
                            style={{
                                fontFamily:
                                    "var(--font-body)",

                                fontSize:
                                    "var(--font-size-base)",

                                lineHeight:
                                    "var(--line-height-body)",

                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            Attach images, PDFs,
                            audio files, or videos.
                        </p>

                    </Card>

                ) : (

                    quote.attachments.map(
                        (attachment) => (
                            <AttachmentRenderer
                                key={attachment.id}
                                attachment={attachment}
                                quoteId={quote.id}
                                id={id}
                            />
                        )
                    )

                )}

            </section>

            <Divider />

            {/* Reflections */}

            <section className="flex flex-col gap-6">

                <div className="flex flex-wrap items-center justify-between gap-4">

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

                            letterSpacing:
                                "var(--letter-spacing-heading)",
                        }}
                    >
                        Reflections
                    </h2>

                    <Link
                        href={`/book/${id}/quote/${quoteId}/add-reflection`}
                    >
                        <Button>
                            Add Reflection
                        </Button>
                    </Link>

                </div>

                {quote.reflections.length === 0 ? (

                    <Card className="flex flex-col gap-4">

                        <p
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
                            No reflections yet.
                        </p>

                        <p
                            style={{
                                fontFamily:
                                    "var(--font-body)",

                                fontSize:
                                    "var(--font-size-base)",

                                lineHeight:
                                    "var(--line-height-body)",

                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            Write your thoughts
                            about this quote.
                        </p>

                    </Card>

                ) : (

                    quote.reflections.map(
                        (reflection) => (
                            <Card
                                key={reflection.id}
                                className="flex flex-col gap-4 p-6"
                            >
                                <Link
                                    href={`/book/${id}/quote/${quoteId}/reflection/${reflection.id}`}
                                >
                                    <p
                                        style={{
                                            fontFamily:
                                                "var(--font-body)",

                                            fontSize:
                                                "var(--font-size-lg)",

                                            fontWeight:
                                                "var(--font-weight-normal)",

                                            lineHeight:
                                                "var(--line-height-body)",

                                            color:
                                                "var(--text-primary)",
                                        }}
                                    >
                                        {reflection.content}
                                    </p>
                                </Link>

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
                                    {new Date(
                                        reflection.created_at
                                    ).toDateString()}
                                </p>

                            </Card>
                        )
                    )

                )}

            </section>

        </main>
    );
};

export default QuotePage;