import prisma from "@/lib/prisma";
import UpdateBook from "@/app/actions/Update";
const EditBookPage = async({ params }) => {
const {id} = await params
const book = await prisma.books.findUnique({
where: {
    id : Number.parseInt(id)
}
})
return(
  <main>
    <form action={UpdateBook}>
      <input name="title" defaultValue={book.title} />

      <input name="author" defaultValue={book.author} />

      <input type="hidden" name="book_id" value={book.id} />

      <button>Save Changes</button>
    </form>
  </main>
)
};
export default EditBookPage