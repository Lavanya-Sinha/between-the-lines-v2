
import prisma from "@/lib/prisma";
import Link from "next/link";
export default async function Home() {
  const books = await prisma.books.findMany()
  console.log(books)
  return (
   <main>
    <h1>Books from PostgreSQL</h1>
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
   </main>
  );
}
