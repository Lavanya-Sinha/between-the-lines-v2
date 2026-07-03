import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Logout from "../actions/Logout";

export default async function Dashboard() {
    const user = await requireUser()
  const books = await prisma.books.findMany({
    where:{
        user_id: user.id
    }
  })
  console.log(books)
  return (
    <main>
         <header>
            <h1>Welcome Back, {user.display_name}!</h1>
      <h1>Your Library</h1>

      <Link href="/add-book">
          <button>+ Add Book</button>
      </Link>
  </header>
    {
      books.map((book)=>{
        return(
           <div key={book.id}>
            <Link href={`/book/${book.id}`}>
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            </Link>
        </div>
      
        )
      })
    }
    <form action={Logout}>
    <button type="submit">
        Logout
    </button>
</form>
   </main>
  );
}
