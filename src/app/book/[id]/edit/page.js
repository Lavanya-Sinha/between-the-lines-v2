import prisma from "@/lib/prisma";
import requireSearchAccess from "@/lib/auth/requireSearchAccess";
import UpdateBook from "@/app/actions/Update";

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
                    Book not found
                </h1>

            </main>
        );
    }

    const labelStyle = {
        fontFamily: "var(--font-body)",
        fontSize: "var(--font-size-sm)",
        fontWeight: "var(--font-weight-semibold)",
        lineHeight: "var(--line-height-body)",
        color: "var(--text-primary)",
    };

    return (
        <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 p-8">

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
                            "var(--text-secondary)",
                    }}
                >
                    Update your book information and cover.
                </p>

            </div>

            <Card className="flex flex-col gap-6 p-8">

                <form
                    action={UpdateBook}
                    className="flex flex-col gap-6"
                >

                    <div className="flex flex-col gap-2">

                        <label style={labelStyle}>
                            Title
                        </label>

                        <Input
                            name="title"
                            defaultValue={book.title}
                            placeholder="Book title"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label style={labelStyle}>
                            Author
                        </label>

                        <Input
                            name="author"
                            defaultValue={book.author}
                            placeholder="Author name"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label style={labelStyle}>
                            Genres
                        </label>

                        <Input
                            name="genres"
                            defaultValue={book.genres}
                            placeholder="Fantasy, Mystery, Fiction"
                        />

                    </div>

                    <div className="flex flex-col gap-4">

                        <label style={labelStyle}>
                            Current cover
                        </label>

                        {book.cover_img && (
                            <img
                                src={book.cover_img}
                                alt={`${book.title} cover`}
                                className="h-72 w-52 rounded-lg object-cover"
                            />
                        )}

                    </div>

                    <div className="flex flex-col gap-2">

                        <label style={labelStyle}>
                            Replace cover (optional)
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
    );
};

export default EditBookPage;