import prisma from "@/lib/prisma";
import UpdateBook from "@/app/actions/Update";
const EditBookPage = async ({ params }) => {
  const { id } = await params;
  const book = await prisma.books.findUnique({
    where: {
      id: Number.parseInt(id),
    },
  });
  return (
    <main>
      <form action={UpdateBook}>
        <input name="title" defaultValue={book.title} />

        <input name="author" defaultValue={book.author} />

        <input name="genres" defaultValue={book.genres} placeholder="genres" />
        <div>
          <label>Current Cover</label>

          {book.cover_img && (
            <img src={book.cover_img} alt={`${book.title} cover`} width={150} />
          )}
        </div>

        <div>
          <label>Replace Cover (optional)</label>

          <input type="file" name="book_cover" accept="image/*" />
        </div>
        <input type="hidden" name="book_id" value={book.id} />

        <button>Save Changes</button>
      </form>
    </main>
  );
};
export default EditBookPage;
