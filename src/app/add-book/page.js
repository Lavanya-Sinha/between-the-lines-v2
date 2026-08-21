import Link from "next/link";

import requireUser from "@/lib/auth/requireUser";

import CreateBook from "../actions/Create";

import ThemeBackground from "../components/themes/ThemeBackground";
import ThemeAtmosphere from "../components/themes/ThemeAtmosphere";

import Button from "../components/ui/Button";
import SubmitButton from "../components/ui/Button/SubmitButton";
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
        <Link
          href="/dashboard"
          style={{
            fontFamily: "var(--font-body)",

            fontSize: "var(--font-size-base)",

            fontWeight: "var(--font-weight-medium)",

            lineHeight: "var(--line-height-body)",

            color: "var(--text-on-background)",
          }}
        >
          ← Back to Bookshelf
        </Link>

        <header
          className="
                        flex
                        flex-col
                        gap-2
                    "
        >
          <h1
            style={{
              fontFamily: "var(--font-heading)",

              fontSize: "var(--font-size-3xl)",

              fontWeight: "var(--font-weight-bold)",

              lineHeight: "var(--line-height-heading)",

              letterSpacing: "var(--letter-spacing-heading)",

              color: "var(--text-on-background)",
            }}
          >
            Add a Book
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",

              fontSize: "var(--font-size-base)",

              fontWeight: "var(--font-weight-normal)",

              lineHeight: "var(--line-height-body)",

              color: "var(--text-on-background)",
            }}
          >
            Start building your personal bookshelf.
          </p>
        </header>

        <Card className="p-6 sm:p-8">
          <form
            action={CreateBook}
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
              <label htmlFor="title" style={labelStyle}>
                Book Title
              </label>

              <Input
                id="title"
                type="text"
                name="title"
                placeholder="The Midnight Library"
                autoComplete="off"
              />
            </div>

            <div
              className="
                                flex
                                flex-col
                                gap-2
                            "
            >
              <label htmlFor="author" style={labelStyle}>
                Author Name
              </label>

              <Input
                id="author"
                type="text"
                name="author"
                placeholder="Matt Haig"
                autoComplete="off"
              />
            </div>

            <div
              className="
                                flex
                                flex-col
                                gap-2
                            "
            >
              <label htmlFor="genres" style={labelStyle}>
                Genres
              </label>

              <Input
                id="genres"
                type="text"
                name="genres"
                placeholder="Fantasy, Fiction, Philosophy"
              />
            </div>

            <div
              className="
                                flex
                                flex-col
                                gap-2
                            "
            >
              <label htmlFor="book_cover" style={labelStyle}>
                Cover Image
              </label>

              <Input
                id="book_cover"
                type="file"
                name="book_cover"
                accept="image/*"
              />
            </div>

            <SubmitButton loadingText="Adding Book...">Add Book</SubmitButton>
          </form>
        </Card>
      </main>
    </ThemeBackground>
  );
};

export default AddBookPage;
