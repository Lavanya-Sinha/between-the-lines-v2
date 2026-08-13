import Link from "next/link";

import prisma from "@/lib/prisma";

import CreateQuote from "@/app/actions/CreateQuote";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Textarea from "@/app/components/ui/Textarea";

const AddQuotes = async ({ params }) => {
    const { id } = await params;

    const book = await prisma.books.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!book) {
        return (
            <main className="p-8">

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
                    }}
                >
                    Book not found.
                </h1>

            </main>
        );
    }

    return (
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 p-8">

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
                ← Back to {book.title}
            </Link>

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
                    Add a Quote
                </h1>

                <p
                    style={{
                        fontFamily:
                            "var(--font-body)",

                        fontSize:
                            "var(--font-size-base)",

                        fontWeight:
                            "var(--font-weight-normal)",

                        lineHeight:
                            "var(--line-height-body)",

                        color:
                            "var(--text-secondary)",
                    }}
                >
                    Capture the lines that stayed with you.
                </p>

            </div>

            <Card className="p-10">

                <form
                    action={CreateQuote}
                    className="flex flex-col gap-6"
                >

                    <Textarea
                        name="quote-text"
                        rows={12}
                        placeholder="Write a memorable passage..."
                        className="min-h-80"
                        style={{
                            fontFamily:
                                "var(--font-quote)",

                            fontSize:
                                "var(--font-size-xl)",

                            lineHeight:
                                "var(--line-height-quote)",
                        }}
                    />

                    <input
                        type="hidden"
                        name="id"
                        value={id}
                    />

                    <Button type="submit">
                        Add Quote
                    </Button>

                </form>

            </Card>

        </main>
    );
};

export default AddQuotes;
