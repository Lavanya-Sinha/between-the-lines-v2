import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Logout from "../actions/Logout";
import Search from "../components/Search";


export default async function Dashboard({searchParams}) {
  const user = await requireUser();
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
  const books = await prisma.books.findMany({
    where
  });
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
              <p>{`Added On ${book.created_at?.toLocaleString()}`}</p>
              <p>{`Updated On ${book.updated_at?.toLocaleString()}`}</p>
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
