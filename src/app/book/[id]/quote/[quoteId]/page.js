import prisma from "@/lib/prisma";
import AddMoodTag from "@/app/actions/AddMoodTag";
import Link from "next/link";
import DeleteQuote from "@/app/actions/DeleteQuote";
import RemoveMoodTag from "@/app/actions/RemoveMoodTag";

const QuotePage = async ({ params }) => {
  const { id, quoteId } = await params;
  const quote = await prisma.quotes.findUnique({
    where: {
      id: Number.parseInt(quoteId),
    },
    include: {
      reflections: true,
      mood_tags: true,
    },
  });
  console.log(quote);
  return (
    <main>
      <h1>Quote Page</h1>
      <p>{quote.text}</p>
      <br />
      <form action={DeleteQuote}>
        <input type="hidden" name="quote_id" value={quote.id} />
        <input type="hidden" name="book_id" value={id} />
        <button>Delete Quote</button>
      </form>
      <br />
      <form action={AddMoodTag}>
        <input type="text" name="tag_name" placeholder="Add mood tag..." />
        <input type="hidden" name="quote_id" value={quote.id} />
        <input type="hidden" name="book_id" value={id} />
        <button type="submit">Add Tag</button>
      </form>
      <br />

      {quote.mood_tags.map((tag) => (
        <div key={tag.id}>
          <p>{tag.name}</p>
          <form action={RemoveMoodTag}>
            <input type="hidden" name="quote_id" value={quote.id} />
            <input type="hidden" name="tag_id" value={tag.id} />
            <input type="hidden" name="book_id" value={id} />
            <button type="submit">Remove</button>
          </form>
        </div>
      ))}
      <br />
      {quote.reflections.map((reflection) => (
        <div key={reflection.id}>
          <Link
            href={`/book/${id}/quote/${quoteId}/reflection/${reflection.id}`}
          >
            <p>{reflection.content}</p>
          </Link>
          <p>Created At : {reflection.created_at.toDateString()}</p>
          <br />
          <Link href={`/book/${id}/quote/${quoteId}/edit-quote`}>
            Edit Quote
          </Link>
          <br />
        </div>
      ))}
    </main>
  );
};
export default QuotePage;
