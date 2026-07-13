import requireSearchAccess from "@/lib/auth/requireSearchAccess";
import Link from "next/link";
import Logout from "../actions/Logout";
import Search from "../components/Search";
import getDashboard from "@/lib/books/getDashboard";

export default async function Dashboard({searchParams}) {
  const user = await requireSearchAccess()
  const params = await searchParams
  const search = params.search ?? ""
  const where = {
    user_id : user.id
  }
  if(search){
    where.OR = [
      {
        title:{
          contains: search,
          mode: "insensitive"
        },
      },
      {
        author:{
          contains: search,
          mode: "insensitive"
        }
      },
      {
        genres:{
          has: search,
        }
      }
    ]
  }
  const books = await getDashboard({
    userId : user.id,
    search,
    where
  })
  console.log(books);
  return (
    <main>
      <header>
        <h1>Welcome Back, {user.display_name}!</h1>
        <h1>Your Library</h1>
            
        <Search
        action="/dashboard"
        placeholder="Search Your Books..."
        queryName="search"
        defaultValue={search}
        />

        <Link href="/add-book">
          <button>+ Add Book</button>
        </Link>
      </header>
      {books.map((book) => {
        return (
          <div key={book.id}>
            <Link href={`/book/${book.id}`}>
              {book.cover_img && (
                <img
                  src={book.cover_img}
                  alt={`${book.title} cover`}
                  width={150}
                />
              )}
              <h1>{book.title}</h1>
              <p>{book.author}</p>
              <p>{book.genres.join(" • ")}</p>
              <p>{`Added On ${new Date(book.created_at).toLocaleDateString()}`}</p>
              <p>{`Updated On ${new Date(book.updated_at).toLocaleDateString()}`}</p>
            </Link>
          </div>
        );
      })}
      <form action={Logout}>
        <button type="submit">Logout</button>
      </form>
    </main>
  );
}
