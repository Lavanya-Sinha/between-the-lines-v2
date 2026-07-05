import CreateQuote from "@/app/actions/CreateQuote";
import prisma from "@/lib/prisma";
import Link from "next/link";

const AddQuotes = async ({ params }) => {
  const { id } = await params;
  const book = await prisma.books.findUnique({
    where: {
      id: Number(id),
    },
  });
  return (
    <main>
      <Link href={`/book/${id}`}>← Back to {book.title}</Link>
      <br />
      <br />
      <h1>ADD YOUR QUOTE</h1>
      <br />
      <form action={CreateQuote}>
        <div>
          <textarea
            name="quote-text"
            rows={3}
            placeholder="Write a memorable passage..."
             style={{ width: "100%" }}
          />
        </div>
        <div>
          <input type="hidden" name="id" value={id} />
        </div>
        <button type="submit">Add Quote</button>
      </form>
    </main>
  );
};
export default AddQuotes;
