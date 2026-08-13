import Link from "next/link";

import requireUser from "@/lib/auth/requireUser";

import CreateBook from "../actions/Create";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

const AddBookPage = async () => {
    await requireUser();

    const labelStyle = {
        fontFamily: "var(--font-body)",
        fontSize: "var(--font-size-sm)",
        fontWeight: "var(--font-weight-semibold)",
        lineHeight: "var(--line-height-body)",
        color: "var(--text-primary)",
    };

    return (
        <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 p-8">

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
                ← Back to Bookshelf
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
                    📚 Add a Book
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
                    Start building your personal bookshelf.
                </p>

            </div>

            <Card className="p-8">

                <form
                    action={CreateBook}
                    className="flex flex-col gap-6"
                >

                    <div className="flex flex-col gap-2">

                        <label style={labelStyle}>
                            Book Title
                        </label>

                        <Input
                            type="text"
                            name="title"
                            placeholder="The Midnight Library"
                            autoComplete="off"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label style={labelStyle}>
                            Author Name
                        </label>

                        <Input
                            type="text"
                            name="author"
                            placeholder="Matt Haig"
                            autoComplete="off"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label style={labelStyle}>
                            Genres
                        </label>

                        <Input
                            type="text"
                            name="genres"
                            placeholder="Fantasy, Fiction, Philosophy"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label style={labelStyle}>
                            Cover Image
                        </label>

                        <Input
                            type="file"
                            name="book_cover"
                            accept="image/*"
                        />

                    </div>

                    <Button type="submit">
                        Add Book
                    </Button>

                </form>

            </Card>

        </main>
    );
};

export default AddBookPage;