import Link from "next/link";

import requireSearchAccess from "@/lib/auth/requireSearchAccess";
import getDashboard from "@/lib/books/getDashboard";

import Logout from "../actions/Logout";

import Search from "../components/Search";
import EmptyState from "../components/ui/EmptyStates";

import ThemeBackground from "../components/themes/ThemeBackground";
import ThemeAtmosphere from "../components/themes/ThemeAtmosphere";
import ThemeDecoratives from "../components/themes/ThemeDecoratives";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import CloudinaryImage from "../components/CloudinaryImage";

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
                    max-w-7xl
                    flex-col
                    gap-10
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
                        gap-6
                    "
                >
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

                                color:
                                    "var(--text-on-background)",
                            }}
                        >
                            Welcome back,{" "}
                            {user.display_name}!
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
                                    "var(--text-on-background-secondary)",
                            }}
                        >
                            Your personal library.
                        </p>
                    </div>

                    <Search
                        placeholder="Search your books..."
                        defaultValue={search}
                    />

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-4
                        "
                    >
                        <Link href="/add-book">
                            <Button>
                                + Add Book
                            </Button>
                        </Link>

                        <form action={Logout}>
                            <Button
                                type="submit"
                                variant="ghostBackground"
                            >
                                Log Out
                            </Button>
                        </form>
                    </div>
                </header>

                {books.length === 0 ? (
                    <EmptyState
                        type="books"
                        description="Your library is empty. Add your first book to begin."
                    />
                ) : (
                    <section
                        className="
                            grid
                            gap-6
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {books.map((book) => (
                            <Link
                                key={book.id}
                                href={`/book/${book.id}`}
                            >
                                <Card
                                    className="
                                        h-full
                                        transition-transform
                                        hover:-translate-y-1
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-full
                                            flex-col
                                            gap-4
                                        "
                                    >
                                        {book.cover_img && (
                                            <div
                                                className="
                                                    relative
                                                    aspect-[3/4]
                                                    overflow-hidden
                                                    rounded-lg
                                                "
                                            >
                                                <CloudinaryImage
                                                    src={
                                                        book.cover_img
                                                    }
                                                    alt={
                                                        book.title
                                                    }
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-1">
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
                                                {book.title}
                                            </h2>

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
                                                        "var(--text-secondary)",
                                                }}
                                            >
                                                {book.author}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </section>
                )}
            </main>
        </ThemeBackground>
    );
}
