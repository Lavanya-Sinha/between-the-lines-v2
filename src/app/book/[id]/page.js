import Link from "next/link";

import requireSearchAccess from "@/lib/auth/requireSearchAccess";
import getBook from "@/lib/books/getBook";

import DeleteBook from "@/app/actions/Delete";

import Search from "@/app/components/Search";
import CloudinaryImage from "@/app/components/CloudinaryImage";

import ThemeBackground from "@/app/components/themes/ThemeBackground";
import ThemeAtmosphere from "@/app/components/themes/ThemeAtmosphere";
import ThemeDecoratives from "@/app/components/themes/ThemeDecoratives";

import EmptyState from "@/app/components/ui/EmptyStates";
import Button from "@/app/components/ui/Button";
import SubmitButton from "@/app/components/ui/Button/SubmitButton";
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
                        gap-6
                        px-6
                        py-8
                        sm:px-8
                    "
        >
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
            Book not found
          </h1>

          <Link href="/dashboard">
            <Button variant="ghost">Back to bookshelf</Button>
          </Link>
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
            ← Back to bookshelf
          </Link>

          <Search
            placeholder="Search your quotes..."
            defaultValue={searchText}
          />

          <div
            className="flex flex-wrap gap"
          >
            <Link href={`/book/${id}/edit`}>
              <Button>Edit Book</Button>
            </Link>

            <form action={DeleteBook}>
              <input type="hidden" name="id" value={book.id} />

              <SubmitButton variant="danger" loadingText="Deleting...">
                Delete Book
              </SubmitButton>
            </form>
          </div>
        </header>

        <Card
          className="
                        flex
                        flex-col
                        gap-8
                        p-6
                        md:flex-row
                        md:p-8
                    "
        >
          {book.cover_img && (
            <div
              className="
                                flex
                                shrink-0
                                justify-center
                                md:justify-start
                            "
            >
              <CloudinaryImage
                src={book.cover_img}
                alt={`${book.title} cover`}
                width={250}
                height={375}
                sizes="
                                    (max-width: 768px) 200px,
                                    250px
                                "
                className="
                                    h-auto
                                    max-w-full
                                    rounded-lg
                                    object-cover
                                "
              />
            </div>
          )}

          <div
            className="
                            flex
                            flex-1
                            flex-col
                            gap-4
                        "
          >
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
              {book.title}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "var(--font-size-base)",

                lineHeight: "var(--line-height-body)",

                color: "var(--text-secondary)",
              }}
            >
              <strong>Author:</strong> {book.author}
            </p>

            <p
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "var(--font-size-base)",

                lineHeight: "var(--line-height-body)",

                color: "var(--text-secondary)",
              }}
            >
              <strong>Genres:</strong> {book.genres.join(" • ")}
            </p>

            <Divider />

            <div
              className="
                                flex
                                flex-col
                                gap-2
                            "
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "var(--font-size-sm)",

                fontWeight: "var(--font-weight-normal)",

                lineHeight: "var(--line-height-body)",

                color: "var(--text-muted)",
              }}
            >
              <p>Added on {new Date(book.created_at).toLocaleDateString()}</p>

              <p>Updated on {new Date(book.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </Card>

        <section
          className="
                        flex
                        flex-col
                        gap-6
                    "
        >
          <div
            className="
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-4
                        "
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",

                fontSize: "var(--font-size-2xl)",

                fontWeight: "var(--font-weight-semibold)",

                lineHeight: "var(--line-height-heading)",

                letterSpacing: "var(--letter-spacing-heading)",

                color: "var(--text-on-background)",
              }}
            >
              Quotes ({book.quotes.length})
            </h2>

            <Link href={`/book/${book.id}/add-quotes`}>
              <Button>Add Quote</Button>
            </Link>
          </div>

          {book.quotes.length === 0 ? (
            <EmptyState
              type="quotes"
              action={
                <Link href={`/book/${book.id}/add-quotes`}>
                  <Button>Add Your First Quote</Button>
                </Link>
              }
            />
          ) : (
            <div
              className="
                                flex
                                flex-col
                                gap-4
                            "
            >
              {book.quotes.map((quote) => (
                <Card key={quote.id}>
                  <Link
                    href={`/book/${book.id}/quote/${quote.id}`}
                    style={{
                      fontFamily: "var(--font-quote)",

                      fontSize: "var(--font-size-xl)",

                      fontWeight: "var(--font-weight-normal)",

                      lineHeight: "var(--line-height-quote)",

                      color: "var(--text-primary)",
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
    </ThemeBackground>
  );
};

export default BookPage;
