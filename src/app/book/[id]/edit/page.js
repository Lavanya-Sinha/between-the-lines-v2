import prisma from "@/lib/prisma";
import requireSearchAccess from "@/lib/auth/requireSearchAccess";
import UpdateBook from "@/app/actions/Update";

import ThemeBackground from "@/app/components/themes/ThemeBackground";
import ThemeAtmosphere from "@/app/components/themes/ThemeAtmosphere";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Input from "@/app/components/ui/Input";

const EditBookPage = async ({ params }) => {
    await requireSearchAccess();

    const { id } = await params;

    const book = await prisma.books.findUnique({
        where: {
            id: Number.parseInt(id),
        },
    });

    if (!book) {
        return (
            <ThemeBackground>
                <ThemeAtmosphere />

                <main className="relative z-10 p-8">
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
                        Book not found
                    </h1>
                </main>
            </ThemeBackground>
        );
    }

    const labelStyle = {
        fontFamily:
            "var(--font-body)",

        fontSize:
            "var(--font-size-sm)",

        fontWeight:
            "var(--font-weight-semibold)",

        lineHeight:
            "var(--line-height-body)",

        color:
            "var(--text-primary)",
    };

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
                        gap-2
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
                                "var(--text-on-background)",
                        }}
                    >
                        Edit Book
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
                               "var(--text-on-background)",
                        }}
                    >
                        Update your book information
                        and cover.
                    </p>
                </header>

                <Card className="p-6 sm:p-8">
                    <form
                        action={UpdateBook}
                        className="
                            flex
                            flex-col
                            gap-6
                        "
                    >
                        <div
                            className="
                                flex
                                flex-col
                                gap-2
                            "
                        >
                            <label style={labelStyle}>
                                Title
                            </label>

                            <Input
                                name="title"
                                defaultValue={book.title}
                                placeholder="Book title"
                            />
                        </div>

                        <div
                            className="
                                flex
                                flex-col
                                gap-2
                            "
                        >
                            <label style={labelStyle}>
                                Author
                            </label>

                            <Input
                                name="author"
                                defaultValue={book.author}
                                placeholder="Author name"
                            />
                        </div>

                        <div
                            className="
                                flex
                                flex-col
                                gap-2
                            "
                        >
                            <label style={labelStyle}>
                                Genres
                            </label>

                            <Input
                                name="genres"
                                defaultValue={book.genres}
                                placeholder="Fantasy, Mystery, Fiction"
                            />
                        </div>

                        {book.cover_img && (
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-4
                                "
                            >
                                <label
                                    style={labelStyle}
                                >
                                    Current cover
                                </label>

                                <img
                                    src={book.cover_img}
                                    alt={`${book.title} cover`}
                                    className="
                                        h-72
                                        w-52
                                        rounded-lg
                                        object-cover
                                    "
                                />
                            </div>
                        )}

                        <div
                            className="
                                flex
                                flex-col
                                gap-2
                            "
                        >
                            <label style={labelStyle}>
                                Replace cover
                                (optional)
                            </label>

                            <Input
                                type="file"
                                name="book_cover"
                                accept="image/*"
                            />
                        </div>

                        <input
                            type="hidden"
                            name="book_id"
                            value={book.id}
                        />

                        <Button type="submit">
                            Save Changes
                        </Button>
                    </form>
                </Card>
            </main>
        </ThemeBackground>
    );
};

export default EditBookPage;