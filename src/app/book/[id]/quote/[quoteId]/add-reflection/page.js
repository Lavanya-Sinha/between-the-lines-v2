import requireUser from "@/lib/auth/requireUser";
import CreateReflection from "@/app/actions/CreateReflection";
import prisma from "@/lib/prisma";

const AddReflection = async({params})=>{
  const user = requireUser()
    const { id ,quoteId } = await params;
   const quote = await prisma.quotes.findUnique({
    where: {
        id: Number(quoteId)
    },
    include: {
        book: true
    }
});
    return(
    <main>
      <h2>{quote.book.title}</h2>

<p>{quote.book.author}</p>

<blockquote>
    {quote.text}
</blockquote>
        <h1>ADD YOUR Reflection</h1>
     <form action={CreateReflection}>
  <textarea name="content" />

<input
  type="hidden"
  name="book_id"
  value={id}
/>
  <input
    type="hidden"
    name="quote_id"
    value={quoteId}
  />

  <button>
    Save Reflection
  </button>
</form>
    </main>
    )
}
export default AddReflection