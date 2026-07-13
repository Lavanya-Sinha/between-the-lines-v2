import requireSearchAccess from "@/lib/auth/requireSearchAccess";
import getBook from "@/lib/books/getBook";
import Link from "next/link";
import DeleteBook from "@/app/actions/Delete";
import Search from "@/app/components/Search";

const BookPage = async ({ params, searchParams }) => {
  await requireSearchAccess();
  const search = await searchParams;
  const searchText = search.search ?? "";

  const include = {
    quotes: {
      where: {
        text: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    },
  };

  const { id } = await params;

  const book = await getBook({ id, searchText, include });
  if (!book) {
    return (
      <main>
        <h1>Book not found</h1>
        <Link href="/">Back Home</Link>
      </main>
    );
  }

  return (
    <main>
      <Link href="/dashboard">← Back to Bookshelf</Link>
      <Search
        action={`/book/${id}`}
        placeholder="Search Your Quotes..."
        queryName="search"
        defaultValue={searchText}
      />
      {book.cover_img && (
        <img src={book.cover_img} alt={`${book.title} cover`} width={150} />
      )}
      <h1>{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <strong>Genres: {book.genres.join(" • ")}</strong>
      <div>
        <strong>Added:</strong> {new Date(book.created_at).toLocaleDateString()}
      </div>
      <strong>Updated: </strong>
      <strong>Updated:</strong> {new Date(book.updated_at).toLocaleDateString()}
      <Link href={`/book/${id}/edit`}>Edit Book</Link>
      <form action={DeleteBook}>
        <input type="hidden" name="id" value={book.id} />
        <button type="submit">Delete Book</button>
      </form>
      <h2>Quotes ({book.quotes.length})</h2>
      <br />
      <Link href={`/book/${book.id}/add-quotes`}>Add Another Quote</Link>
      <br />
      {book.quotes.length === 0 ? (
        <div>
          <p>No quotes yet.</p>
          <p>Start capturing memorable passages from this book.</p>

          <Link href={`/book/${book.id}/add-quotes`}>Add Your First Quote</Link>
        </div>
      ) : (
        <>
          {book.quotes.map((quote) => (
            <div key={quote.id}>
              <Link href={`/book/${book.id}/quote/${quote.id}`}>
                {quote.text}
              </Link>
            </div>
          ))}
        </>
      )}
    </main>
  );
};
export default BookPage;
