import Link from "next/link";

import CreateReflection from "@/app/actions/CreateReflection";

import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Divider from "@/app/components/ui/Divider";
import Textarea from "@/app/components/ui/Textarea";

const AddReflection = async ({ params }) => {
    await requireUser();

    const { id, quoteId } = await params;

    const quote =
        await prisma.quotes.findUnique({
            where: {
                id: Number(quoteId),
            },
            include: {
                book: true,
            },
        });

    return (
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 p-8">

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
                    {quote.book.title}
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
                    {quote.book.author}
                </p>

            </Card>

            <Card className="p-8">

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
                    }}
                >
                    {quote.text}
                </blockquote>

            </Card>

            <Card className="flex flex-col gap-6 p-8">

                <div className="flex flex-col gap-2">

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
                        Add Reflection
                    </h1>

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
                        Capture your thoughts, emotions, or
                        interpretations inspired by this quote.
                    </p>

                </div>

                <Divider />

                <form
                    action={CreateReflection}
                    className="flex flex-col gap-6"
                >

                    <Textarea
                        name="content"
                        rows={10}
                        placeholder="What does this quote mean to you?"
                        className="min-h-72"
                        style={{
                            fontFamily:
                                "var(--font-handwriting)",
                            fontSize:
                                "var(--font-size-xl)",
                            lineHeight:
                                "var(--line-height-body)",
                        }}
                    />

                    <input
                        type="hidden"
                        name="book_id"
                        value={id}
                    />

                    <input
                        type="hidden"
                        name="quote_id"
                        value={quoteId}
                    />

                    <div className="self-start">

                        <Button>
                            Save Reflection
                        </Button>

                    </div>

                </form>

            </Card>

        </main>
    );
};

export default AddReflection;
