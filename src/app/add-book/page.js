import CreateBook from "../actions/Create"

const AddBookPage = ()=>{
    return(
     <main>
        <h1>ADD A BOOK</h1>
        <form action={CreateBook}>
         <div>
            <label>Title: </label>
            <input type="text" name="title" />
         </div>
         <div>
           <label>Author: </label>
           <input type="text" name="author" />
         </div>
         <button type="submit">Add This Book</button>
        </form>
     </main>
    )
}
export default AddBookPage