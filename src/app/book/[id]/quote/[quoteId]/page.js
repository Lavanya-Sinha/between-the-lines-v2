import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";
import AddMoodTag from "@/app/actions/AddMoodTag";
import Link from "next/link";
import DeleteQuote from "@/app/actions/DeleteQuote";
import RemoveMoodTag from "@/app/actions/RemoveMoodTag";
import DoodlePreview from "@/app/components/DoodlePreview";
import AttachmentsClient from "./attachments/AttachmentsClient";
import DeleteAttachment from "@/app/actions/DeleteAttachment";

const QuotePage = async ({ params }) => {
  await requireUser();
  const { id, quoteId } = await params;
  const quote = await prisma.quotes.findUnique({
    where: {
      id: Number.parseInt(quoteId),
    },
    include: {
      reflections: true,
      mood_tags: true,
      doodle: true,
      attachments: true,
    },
  });
  return (
    <main>
      <Link href={`/book/${id}`}>← Back to Book</Link>

      <blockquote>{quote.text}</blockquote>

      <br />

      <Link href={`/book/${id}/quote/${quoteId}/edit-quote`}>Edit Quote</Link>

      <form action={DeleteQuote}>
        <input type="hidden" name="quote_id" value={quote.id} />
        <input type="hidden" name="book_id" value={id} />
        <button>Delete Quote</button>
      </form>

      <hr />

      <h2>Mood Tags</h2>

      <form action={AddMoodTag}>
        <input type="text" name="tag_name" placeholder="Add mood tag..." />
        <input type="hidden" name="quote_id" value={quote.id} />
        <input type="hidden" name="book_id" value={id} />
        <button>Add Tag</button>
      </form>

      <br />

      {quote.mood_tags.map((tag) => (
        <div key={tag.id}>
          <p>{tag.name}</p>

          <form action={RemoveMoodTag}>
            <input type="hidden" name="quote_id" value={quote.id} />

            <input type="hidden" name="tag_id" value={tag.id} />

            <input type="hidden" name="book_id" value={id} />

            <button>Remove</button>
          </form>
        </div>
      ))}

      <hr />

      <h2>Doodle</h2>

      {quote.doodle ? (
        <Link href={`/book/${id}/quote/${quote.id}/doodle`}>
          <DoodlePreview canvasData={quote.doodle.canvas_data} />
        </Link>
      ) : (
        <>
          <p>No doodle yet.</p>

          <Link href={`/book/${id}/quote/${quote.id}/doodle`}>
            Create Doodle
          </Link>
        </>
      )}

      <hr />

      <h2>Attachments</h2>

      <AttachmentsClient quoteId={quote.id} id={id} />

      <br />

      {quote.attachments.length === 0 ? (
        <>
          <p>No attachments yet.</p>
          <p>Attach images, PDFs, audio or videos.</p>
        </>
      ) : (
        quote.attachments.map((attachment) => (
          <div key={attachment.id}>
            <a
              href={attachment.file_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {attachment.file_name}
            </a>

            <form action={DeleteAttachment}>
              <input type="hidden" name="attachmentId" value={attachment.id} />

              <input type="hidden" name="quoteId" value={quote.id} />

              <input type="hidden" name="id" value={id} />

              <button>Delete</button>
            </form>
          </div>
        ))
      )}

      <hr />

      <h2>Reflections</h2>

      <Link href={`/book/${id}/quote/${quoteId}/add-reflection`}>
        <button>Add Reflection</button>
      </Link>

      <br />

      {quote.reflections.length === 0 ? (
        <>
          <p>No reflections yet.</p>
          <p>Write your thoughts about this quote.</p>
        </>
      ) : (
        quote.reflections.map((reflection) => (
          <div key={reflection.id}>
            <Link
              href={`/book/${id}/quote/${quoteId}/reflection/${reflection.id}`}
            >
              <p>{reflection.content}</p>
            </Link>

            <p>Created At: {reflection.created_at.toDateString()}</p>

            <br />
          </div>
        ))
      )}
    </main>
  );
};
export default QuotePage;
