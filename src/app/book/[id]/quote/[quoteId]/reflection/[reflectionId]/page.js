import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";
import DeleteReflection from "@/app/actions/DeleteReflection";
import Link from "next/link";

const ReflectionPage = async ({ params }) => {
  await requireUser();
  const { id, quoteId, reflectionId } = await params;
  const reflection = await prisma.reflections.findUnique({
    where: {
      id: Number.parseInt(reflectionId),
    },
    include: {
      quote: {
        include: {
          book: true,
        },
      },
    },
  });

  return (
    <main>
      <Link href={`/book/${id}/quote/${quoteId}`}>← Back to Quote</Link>

      <h2>{reflection.quote.book.title}</h2>

      <p>{reflection.quote.book.author}</p>

      <blockquote>{reflection.quote.text}</blockquote>

      <hr />

      <h1>Your Reflection</h1>

      <p>{reflection.content}</p>

      <p>
        <strong>Written on:</strong> {reflection.created_at.toDateString()}
      </p>

      <br />

      <Link
        href={`/book/${id}/quote/${quoteId}/reflection/${reflectionId}/edit-reflection`}
      >
        Edit Reflection
      </Link>

      <form action={DeleteReflection}>
        <input type="hidden" name="reflection_id" value={reflection.id} />

        <input type="hidden" name="quote_id" value={reflection.quote_id} />

        <input type="hidden" name="book_id" value={id} />

        <button>Delete Reflection</button>
      </form>
    </main>
  );
};
export default ReflectionPage;
