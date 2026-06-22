import prisma from "@/lib/prisma";
import AddMoodTag from "@/app/actions/AddMoodTag";

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
      <form action={AddMoodTag}>
        <input type="text" name="tag_name" placeholder="Add mood tag..." />
        <input type="hidden" name="quote_id" value={quote.id} />
         <input type="hidden" name="book_id" value={id} />
        <button type="submit">Add Tag</button>
      </form>
      <br />

      {quote.mood_tags.map((tag) => (
        <p key={tag.id}>{tag.name}</p>
      ))}
      <br />
      {quote.reflections.map((reflection) => (
        <div key={reflection.id}>
          <p>{reflection.content}</p>
          <p>Created At : {reflection.created_at.toDateString()}</p>
          <br />
        </div>
      ))}
    </main>
  );
};
export default QuotePage;
