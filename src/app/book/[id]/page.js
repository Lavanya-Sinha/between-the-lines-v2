import Link from "next/link";

import requireSearchAccess from "@/lib/auth/requireSearchAccess";
import getBook from "@/lib/books/getBook";

import DeleteBook from "@/app/actions/Delete";

import Search from "@/app/components/Search";
import CloudinaryImage from "@/app/components/CloudinaryImage";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Divider from "@/app/components/ui/Divider";

const BookPage = async ({ params, searchParams }) => {
    await requireSearchAccess();

    const search = await searchParams;
    const searchText = search.search ?? "";

    const { id } = await params;

    const book = await getBook({
        id,
        searchText,
    });

    if (!book) {
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
                    Book not found
                </h1>

                <Link href="/dashboard">
                    <Button variant="ghost">
                        Back to bookshelf
                    </Button>
                </Link>

            </main>
        );
    }

    return (
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 p-8">

            <header className="flex flex-col gap-6">

                <Link
                    href="/dashboard"
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
                    ← Back to bookshelf
                </Link>

                <Search
                    action={`/book/${id}`}
                    placeholder="Search your quotes..."
                    queryName="search"
                    defaultValue={searchText}
                />

                <div className="flex flex-wrap gap-4">

                    <Link href={`/book/${id}/edit`}>
                        <Button>
                            Edit Book
                        </Button>
                    </Link>

                    <form action={DeleteBook}>

                        <input
                            type="hidden"
                            name="id"
                            value={book.id}
                        />

                        <Button
                            type="submit"
                            variant="danger"
                        >
                            Delete Book
                        </Button>

                    </form>

                </div>

            </header>

            <Card className="flex flex-col gap-8 p-8 md:flex-row">

                {book.cover_img && (
                    <CloudinaryImage
                        src={book.cover_img}
                        alt={`${book.title} cover`}
                        width={250}
                        height={375}
                        sizes="(max-width: 768px) 200px, 250px"
                    />
                )}

                <div className="flex flex-1 flex-col gap-4">

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
                        {book.title}
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
                        <strong>Author:</strong>{" "}
                        {book.author}
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
                        <strong>Genres:</strong>{" "}
                        {book.genres.join(" • ")}
                    </p>

                    <Divider />

                    <div
                        className="flex flex-col gap-2"
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
                        <p>
                            Added on{" "}
                            {new Date(
                                book.created_at
                            ).toLocaleDateString()}
                        </p>

                        <p>
                            Updated on{" "}
                            {new Date(
                                book.updated_at
                            ).toLocaleDateString()}
                        </p>
                    </div>

                </div>

            </Card>

            <section className="flex flex-col gap-6">

                <div className="flex items-center justify-between">

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
                        Quotes ({book.quotes.length})
                    </h2>

                    <Link
                        href={`/book/${book.id}/add-quotes`}
                    >
                        <Button>
                            Add Quote
                        </Button>
                    </Link>

                </div>

                {book.quotes.length === 0 ? (

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
                            No quotes yet.
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
                            Start capturing memorable
                            passages from this book.
                        </p>

                        <Link
                            href={`/book/${book.id}/add-quotes`}
                        >
                            <Button>
                                Add Your First Quote
                            </Button>
                        </Link>

                    </Card>

                ) : (

                    <div className="flex flex-col gap-4">

                        {book.quotes.map((quote) => (

                            <Card key={quote.id}>

                                <Link
                                    href={`/book/${book.id}/quote/${quote.id}`}
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
                                    {quote.text}
                                </Link>

                            </Card>

                        ))}

                    </div>

                )}

            </section>

        </main>
    );
};

export default BookPage;
