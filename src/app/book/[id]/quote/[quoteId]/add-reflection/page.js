import requireUser from "@/lib/auth/requireUser";
import CreateReflection from "@/app/actions/CreateReflection";
import prisma from "@/lib/prisma";
import Link from "next/link";

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
  return (
    <main>
      <Link href={`/book/${id}/quote/${quoteId}`}>← Back to Quote</Link>
      <h2>{quote.book.title}</h2>

      <p>{quote.book.author}</p>

      <blockquote>{quote.text}</blockquote>
      <br />
      <h1>Add Reflection</h1>
      <br />
      <p>
        Capture your thoughts, emotions, or interpretations inspired by this
        quote.
      </p>
      <form action={CreateReflection}>
        <textarea
          name="content"
          rows={5}
          placeholder="What does this quote mean to you?"
          style={{ width: "100%" }}
        />

        <input type="hidden" name="book_id" value={id} />
        <input type="hidden" name="quote_id" value={quoteId} />

        <button>Save Reflection</button>
      </form>
    </main>
  );
};
export default AddReflection;
