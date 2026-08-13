import Link from "next/link";

import requireSearchAccess from "@/lib/auth/requireSearchAccess";
import getDashboard from "@/lib/books/getDashboard";

import Logout from "../actions/Logout";

import Search from "../components/Search";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default async function Dashboard({
    searchParams,
}) {
    const user = await requireSearchAccess();

    const params = await searchParams;

    const search = params.search ?? "";

    const books = await getDashboard({
        userId: user.id,
        search,
    });

    return (
        <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 p-8">

            <header className="flex flex-col gap-6">

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
                        Welcome back, {user.display_name}!
                    </h1>

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
                                "var(--text-secondary)",
                        }}
                    >
                        Your personal library.
                    </p>

                </div>

                <Search
                    action="/dashboard"
                    placeholder="Search your books..."
                    queryName="search"
                    defaultValue={search}
                />

                <div className="flex flex-wrap gap-4">

                    <Link href="/add-book">
                        <Button>
                            + Add Book
                        </Button>
                    </Link>

                    <form action={Logout}>
                        <Button
                            type="submit"
                            variant="ghost"
                        >
                            Log Out
                        </Button>
                    </form>

                </div>

            </header>

            <section className="grid gap-8 md:grid-cols-2">

                {books.length === 0 && (
                    <Card>

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
                            }}
                        >
                            Your bookshelf is empty.
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
                                    "var(--text-secondary)",
                            }}
                        >
                            Add your first book to begin
                            your journey.
                        </p>

                    </Card>
                )}

                {books.map((book) => (
                    <Card
                        key={book.id}
                        className="overflow-hidden p-6"
                    >

                        <Link
                            href={`/book/${book.id}`}
                            className="flex gap-6"
                        >

                            {book.cover_img && (
                                <img
                                    src={book.cover_img}
                                    alt={`${book.title} cover`}
                                    className="h-56 w-40 rounded-lg object-cover"
                                />
                            )}

                            <div className="flex flex-1 flex-col gap-3">

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
                                    {book.title}
                                </h2>

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

                                        color:
                                            "var(--text-secondary)",
                                    }}
                                >
                                    {book.author}
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
                                    {book.genres.join(" • ")}
                                </p>

                                <div
                                    className="mt-auto flex flex-col gap-1"
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

                        </Link>

                    </Card>
                ))}

            </section>

        </main>
    );
}
