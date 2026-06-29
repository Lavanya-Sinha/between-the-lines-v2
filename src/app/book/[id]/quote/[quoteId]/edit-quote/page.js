import prisma from "@/lib/prisma";
import UpdateQuote from "@/app/actions/UpdateQuote";

const EditQuotePage = async ({ params }) => {
    const{quoteId, id} = await params
    const quote = await prisma.quotes.findUnique({
        where:{
            id : Number.parseInt(quoteId)
        }
    })
  return (
    <main>
      <h1>Quote Edit Page</h1>
      <form action={UpdateQuote}>
        <textarea name="text" defaultValue={quote.text} />
        <input type="hidden" name="quote_id" value={quote.id} />
        <input type="hidden" name="book_id" value={id} />
        <button>Save Changes</button>
      </form>
    </main>
  );
};
export default EditQuotePage;
