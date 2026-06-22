import CreateReflection from "@/app/actions/CreateReflection";

const AddReflection = async({params})=>{
    const { id ,quoteId } = await params;
    console.log(await params)
    return(
    <main>
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