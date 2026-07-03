import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";
import DeleteReflection from "@/app/actions/DeleteReflection";
import Link from "next/link";

const ReflectionPage = async ({ params }) => {
  const user = requireUser()
  const { id, quoteId, reflectionId } = await params;
  const reflection = await prisma.reflections.findUnique({
    where: {
      id: Number.parseInt(reflectionId),
    },
  });
  return (
    <main>
      <h1>Reflection</h1>
      <p>{reflection.content}</p>
      <p>{reflection.created_at.toDateString()}</p>
      <form action={DeleteReflection}>
        <input type="hidden" name="reflection_id" value={reflection.id} />
        <input type="hidden" name="quote_id" value={reflection.quote_id} />
        <input type="hidden" name="book_id" value={id} />
        <button>Delete Reflection</button>
      </form>
      <Link
        href={`/book/${id}/quote/${quoteId}/reflection/${reflectionId}/edit-reflection`}
      >
        Edit Reflection
      </Link>
      <br />
      <Link href={`/book/${id}/quote/${quoteId}`}>
    ← Back to Quote
</Link>
    </main>
  );
};
export default ReflectionPage;
