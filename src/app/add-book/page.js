import requireUser from "@/lib/auth/requireUser"
import CreateBook from "../actions/Create"
import Link from "next/link"

const AddBookPage = async()=>{
   const user = await requireUser()
    return(
     <main>
       <Link href="/dashboard">← Back to Bookshelf</Link>
        <h1>📚 Add a Book</h1>
        <br />
        <p>Start building your personal bookshelf.
         <br />
        </p>
        <form action={CreateBook}>
         <div>
            <label>Book Title: </label>
            <input type="text" name="title" placeholder="The Book" autoComplete="off" />
         </div>
         <div>
           <label>Author Name: </label>
           <input type="text" name="author"  placeholder="The Author" autoComplete="off"/>
         </div>
         <button type="submit">Add Book</button>
        </form>
   
     </main>
    )
}
export default AddBookPage