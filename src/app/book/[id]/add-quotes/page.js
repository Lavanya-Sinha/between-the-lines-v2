import Link from "next/link";

import prisma from "@/lib/prisma";
import CreateQuote from "@/app/actions/CreateQuote";

import ThemeBackground from "@/app/components/themes/ThemeBackground";
import ThemeAtmosphere from "@/app/components/themes/ThemeAtmosphere";
import ThemeDecoratives from "@/app/components/themes/ThemeDecoratives";

import SubmitButton from "@/app/components/ui/Button/SubmitButton";
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
      <ThemeBackground>
        <ThemeAtmosphere />

        <main
          className="
                        relative
                        z-10
                        p-8
                    "
        >
          <h1
            style={{
              fontFamily: "var(--font-heading)",

              fontSize: "var(--font-size-3xl)",

              fontWeight: "var(--font-weight-bold)",

              lineHeight: "var(--line-height-heading)",

              color: "var(--text-on-background)",
            }}
          >
            Book not found.
          </h1>
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
                    gap-8
                    px-6
                    py-8
                    sm:px-8
                    lg:py-12
                "
      >
        <Link
          href={`/book/${id}`}
          style={{
            fontFamily: "var(--font-body)",

            fontSize: "var(--font-size-base)",

            fontWeight: "var(--font-weight-medium)",

            lineHeight: "var(--line-height-body)",

            color: "var(--text-on-background)",
          }}
        >
          ← Back to {book.title}
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
            Add a Quote
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
            Capture the lines that stayed with you.
          </p>
        </header>

        <Card className="p-6 sm:p-10">
          <form
            action={CreateQuote}
            className="
                            flex
                            flex-col
                            gap-6
                        "
          >
            <Textarea
              name="quote-text"
              rows={12}
              placeholder="Write a memorable passage..."
              className="min-h-80"
              style={{
                fontFamily: "var(--font-quote)",

                fontSize: "var(--font-size-xl)",

                lineHeight: "var(--line-height-quote)",

                color: "var(--text-primary)",
              }}
            />

            <input type="hidden" name="id" value={id} />

            <SubmitButton loadingText="Saving Quote...">
              Save Quote
            </SubmitButton>
          </form>
        </Card>
      </main>
    </ThemeBackground>
  );
};

export default AddQuotes;
