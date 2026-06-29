import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteBook from "@/app/actions/Delete";

const BookPage = async ({ params }) => {
  const { id } = await params;
  const book = await prisma.books.findUnique({
    where: {
      id: Number.parseInt(id),
    },
    include: {
      quotes: true,
    },
  });
  console.log(book);
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
      <Link href="/">← Back to Books</Link>
      <h1>{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Added:</strong> {book.created_at?.toLocaleDateString()}
      </p>
      <form action={DeleteBook}>
        <input type="hidden" name="id" value={book.id} />

        <button type="submit">Delete Book</button>
      </form>
      <p>
        <strong>Added:</strong>
        {book.created_at?.toLocaleDateString()}
      </p>
      <h2>Quotes</h2>

      {book.quotes.map((quote) => (
        <div key={quote.id}>
          <Link href={`/book/${book.id}/quote/${quote.id}`}>{quote.text}</Link>
        </div>
      ))}
      <Link href={`/book/${book.id}/add-quotes`}>Add Quote</Link>
      <Link href={`/book/${id}/edit`}>Edit Book</Link>
    </main>
  );
};
export default BookPage;
