import Link from "next/link";

import CreateReflection from "@/app/actions/CreateReflection";

import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";

import ThemeBackground from "@/app/components/themes/ThemeBackground";
import ThemeAtmosphere from "@/app/components/themes/ThemeAtmosphere";
import ThemeDecoratives from "@/app/components/themes/ThemeDecoratives";


import SubmitButton from "@/app/components/ui/Button/SubmitButton";
import Card from "@/app/components/ui/Card";
import Divider from "@/app/components/ui/Divider";
import Textarea from "@/app/components/ui/Textarea";

const AddReflection = async ({ params }) => {
  await requireUser();

  const { id, quoteId } = await params;

  const quote = await prisma.quotes.findUnique({
    where: {
      id: Number(quoteId),
    },
    include: {
      book: true,
    },
  });

  if (!quote) {
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

              color: "var(--text-primary)",
            }}
          >
            Quote not found.
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
          href={`/book/${id}/quote/${quoteId}`}
          style={{
            fontFamily: "var(--font-body)",

            fontSize: "var(--font-size-base)",

            fontWeight: "var(--font-weight-medium)",

            lineHeight: "var(--line-height-body)",

            color: "var(--text-on-background)",
          }}
        >
          ← Back to Quote
        </Link>

        <Card
          className="
                        flex
                        flex-col
                        gap-2
                        p-6
                    "
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",

              fontSize: "var(--font-size-2xl)",

              fontWeight: "var(--font-weight-semibold)",

              lineHeight: "var(--line-height-heading)",

              color: "var(--text-primary)",
            }}
          >
            {quote.book.title}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",

              fontSize: "var(--font-size-base)",

              lineHeight: "var(--line-height-body)",

              color: "var(--text-muted)",
            }}
          >
            {quote.book.author}
          </p>
        </Card>

        <Card className="p-6 sm:p-8">
          <blockquote
            className="
                            border-l-4
                            border-[var(--primary)]
                            pl-6
                        "
            style={{
              fontFamily: "var(--font-quote)",

              fontSize: "var(--font-size-xl)",

              fontWeight: "var(--font-weight-normal)",

              lineHeight: "var(--line-height-quote)",

              color: "var(--text-primary)",
            }}
          >
            {quote.text}
          </blockquote>
        </Card>

        <Card
          className="
                        flex
                        flex-col
                        gap-6
                        p-6
                        sm:p-8
                    "
        >
          <div className="flex flex-col gap-2">
            <h1
              style={{
                fontFamily: "var(--font-heading)",

                fontSize: "var(--font-size-3xl)",

                fontWeight: "var(--font-weight-bold)",

                lineHeight: "var(--line-height-heading)",

                letterSpacing: "var(--letter-spacing-heading)",

                color: "var(--text-primary)",
              }}
            >
              Add Reflection
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "var(--font-size-base)",

                lineHeight: "var(--line-height-body)",

                color: "var(--text-secondary)",
              }}
            >
              Capture your thoughts, emotions, or interpretations inspired by
              this quote.
            </p>
          </div>

          <Divider />

          <form
            action={CreateReflection}
            className="
                            flex
                            flex-col
                            gap-6
                        "
          >
            <Textarea
              name="content"
              rows={10}
              placeholder="What does this quote mean to you?"
              className="min-h-72"
              style={{
                fontFamily: "var(--font-handwriting)",

                fontSize: "var(--font-size-xl)",

                lineHeight: "var(--line-height-body)",

                color: "var(--text-primary)",
              }}
            />

            <input type="hidden" name="book_id" value={id} />

            <input type="hidden" name="quote_id" value={quoteId} />

            <div className="self-start">
              <SubmitButton loadingText="Saving Reflection...">
                Save Reflection
              </SubmitButton>
            </div>
          </form>
        </Card>
      </main>
    </ThemeBackground>
  );
};

export default AddReflection;
