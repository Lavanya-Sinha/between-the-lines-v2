import requireSearchAccess from "@/lib/auth/requireSearchAccess";
import AddMoodTag from "@/app/actions/AddMoodTag";
import DeleteQuote from "@/app/actions/DeleteQuote";
import RemoveMoodTag from "@/app/actions/RemoveMoodTag";

import Link from "next/link";

import DoodlePreview from "@/app/components/DoodlePreview";
import AttachmentsClient from "./attachments/AttachmentsClient";
import { AttachmentRenderer } from "@/app/components/AttachmentRenderer";
import Search from "@/app/components/Search";

import ThemeBackground from "@/app/components/themes/ThemeBackground";
import ThemeAtmosphere from "@/app/components/themes/ThemeAtmosphere";
import ThemeDecoratives from "@/app/components/themes/ThemeDecoratives";

import Button from "@/app/components/ui/Button";
import SubmitButton from "@/app/components/ui/Button/SubmitButton";
import Card from "@/app/components/ui/Card";
import Divider from "@/app/components/ui/Divider";
import Input from "@/app/components/ui/Input";
import EmptyState from "@/app/components/ui/EmptyStates";
import Badge from "@/app/components/ui/Badge";

import getQuote from "@/lib/quotes/getQuote";

const QuotePage = async ({
    params,
    searchParams,
}) => {
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
            <ThemeBackground>
                <ThemeAtmosphere />

                <main
                    className="
                        relative
                        z-10
                        mx-auto
                        flex
                        min-h-screen
                        max-w-4xl
                        flex-col
                        gap-6
                        px-6
                        py-8
                        sm:px-8
                    "
                >
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
                        Quote not found.
                    </h1>

                    <Link href={`/book/${id}`}>
                        <Button variant="ghost">
                            ← Back to book
                        </Button>
                    </Link>
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
                    max-w-6xl
                    flex-col
                    gap-10
                    px-6
                    py-8
                    sm:px-8
                    lg:py-12
                "
            >
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

                            color:
                                "var(--text-on-background)",
                        }}
                    >
                        ← Back to Book
                    </Link>

                    <Search
                        placeholder="Search your reflections..."
                        defaultValue={searchReflection}
                    />

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-4
                        "
                    >
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

                            <SubmitButton
                                variant="danger"
                                loadingText="Deleting..."
                            >
                                Delete Quote
                            </SubmitButton>
                        </form>
                    </div>
                </header>

                {/* Quote */}

                <Card
                    className="
                        p-8
                        sm:p-12
                    "
                >
                    <blockquote
                        className="
                            border-l-4
                            border-[var(--primary)]
                            pl-6
                            sm:pl-8
                        "
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

                            color:
                                "var(--text-on-background)",
                        }}
                    >
                        Mood Tags
                    </h2>

                    <form
                        action={AddMoodTag}
                        className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                        "
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

                        <SubmitButton
                            loadingText="Adding..."
                        >
                            Add Tag
                        </SubmitButton>
                    </form>

                    {quote.mood_tags.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {quote.mood_tags.map(
                                (tag) => (
                                    <div
                                        key={tag.id}
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >
                                        <Badge>
                                            {tag.name}
                                        </Badge>

                                        <form
                                            action={
                                                RemoveMoodTag
                                            }
                                        >
                                            <input
                                                type="hidden"
                                                name="quote_id"
                                                value={
                                                    quote.id
                                                }
                                            />

                                            <input
                                                type="hidden"
                                                name="tag_id"
                                                value={
                                                    tag.id
                                                }
                                            />

                                            <input
                                                type="hidden"
                                                name="book_id"
                                                value={id}
                                            />

                                            <SubmitButton
                                                variant="ghostBackground"
                                                loadingText="Removing..."
                                            >
                                                Remove
                                            </SubmitButton>
                                        </form>
                                    </div>
                                )
                            )}
                        </div>
                    )}
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

                            color:
                                "var(--text-on-background)",
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
                                    quote.doodle
                                        .canvas_data
                                }
                            />
                        </Link>
                    ) : (
                        <EmptyState
                            type="doodles"
                            action={
                                <Link
                                    href={`/book/${id}/quote/${quote.id}/doodle`}
                                >
                                    <Button>
                                        Create Doodle
                                    </Button>
                                </Link>
                            }
                        />
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

                            color:
                                "var(--text-on-background)",
                        }}
                    >
                        Attachments
                    </h2>

                    <AttachmentsClient
                        quoteId={quote.id}
                        id={id}
                    />

                    {quote.attachments.length === 0 ? (
                        <EmptyState
                            type="quotes"
                            description="Attach images, PDFs, audio files, or videos."
                        />
                    ) : (
                        <div
                            className="
                                flex
                                flex-col
                                gap-4
                            "
                        >
                            {quote.attachments.map(
                                (attachment) => (
                                    <AttachmentRenderer
                                        key={attachment.id}
                                        attachment={
                                            attachment
                                        }
                                        quoteId={
                                            quote.id
                                        }
                                        id={id}
                                    />
                                )
                            )}
                        </div>
                    )}
                </section>

                <Divider />

                {/* Reflections */}

                <section className="flex flex-col gap-6">
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-4
                        "
                    >
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

                                color:
                                    "var(--text-on-background)",
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
                        <EmptyState
                            type="reflections"
                            action={
                                <Link
                                    href={`/book/${id}/quote/${quoteId}/add-reflection`}
                                >
                                    <Button>
                                        Write a Reflection
                                    </Button>
                                </Link>
                            }
                        />
                    ) : (
                        <div
                            className="
                                flex
                                flex-col
                                gap-4
                            "
                        >
                            {quote.reflections.map(
                                (reflection) => (
                                    <Card
                                        key={
                                            reflection.id
                                        }
                                        className="
                                            flex
                                            flex-col
                                            gap-4
                                            p-6
                                        "
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
                                                {
                                                    reflection.content
                                                }
                                            </p>
                                        </Link>

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
                                                reflection.created_at
                                            ).toDateString()}
                                        </p>
                                    </Card>
                                )
                            )}
                        </div>
                    )}
                </section>
            </main>
        </ThemeBackground>
    );
};

export default QuotePage;