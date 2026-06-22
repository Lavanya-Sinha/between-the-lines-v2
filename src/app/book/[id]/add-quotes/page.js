import CreateQuote from "@/app/actions/CreateQuote";
const AddQuotes = async({params})=>{
    const { id } = await params;
    return(
    <main>
        <h1>ADD YOUR QUOTE</h1>
     <form action={CreateQuote}>
         <div>
            <label>Text: </label>
            <input type="text" name="quote-text" />
         </div>
         <div>
           <input type="hidden" name="id" value={id} />
         </div>
         <button type="submit">Add Quote</button>
     </form>
    </main>
    )
}
export default AddQuotes