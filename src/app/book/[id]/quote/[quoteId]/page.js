import requireSearchAccess from "@/lib/auth/requireSearchAccess";
import AddMoodTag from "@/app/actions/AddMoodTag";
import Link from "next/link";
import DeleteQuote from "@/app/actions/DeleteQuote";
import RemoveMoodTag from "@/app/actions/RemoveMoodTag";
import DoodlePreview from "@/app/components/DoodlePreview";
import AttachmentsClient from "./attachments/AttachmentsClient";
import { AttachmentRenderer } from "@/app/components/AttachmentRenderer";
import Search from "@/app/components/Search";
import getQuote from "@/lib/quotes/getQuote";

const QuotePage = async ({ params, searchParams }) => {
  await requireSearchAccess();

  const searchContent = await searchParams;
  const searchReflection = searchContent.search ?? "";

  const { id, quoteId } = await params;
  const quote = await getQuote({quoteId, searchReflection})

  if (!quote) {
  return (
    <main>
      <h1>Quote not found.</h1>
      <Link href={`/book/${id}`}>Back</Link>
    </main>
  );
}
  return (
    <main>
      <Link href={`/book/${id}`}>← Back to Book</Link>

      <Search
        action={`/book/${id}/quote/${quoteId}`}
        placeholder="Search Your Reflections..."
        queryName="search"
        defaultValue={searchReflection}
      />

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
          <AttachmentRenderer
            key={attachment.id}
            attachment={attachment}
            quoteId={quote.id}
            id={id}
          />
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

            <p>Created At: {new Date(reflection.created_at).toDateString()}</p>

            <br />
          </div>
        ))
      )}
    </main>
  );
};
export default QuotePage;
