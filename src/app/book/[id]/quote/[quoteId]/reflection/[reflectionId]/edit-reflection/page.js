import prisma from "@/lib/prisma"
import UpdateReflection from "@/app/actions/UpdateReflection"

const EditReflectionPage = async({params})=>{
    const{reflectionId, quoteId, id} = await params
    const reflection = await prisma.reflections.findUnique({
        where : {
            id : Number.parseInt(reflectionId)
        }
    })
    return(
    <main>
        <h1>Edit Reflection</h1>
        <form action={UpdateReflection}>
            <textarea name="content" defaultValue={reflection.content}/>
            <input type="hidden" name="reflection_id" value={reflection.id}/>
            <input type="hidden" name="quote_id" value={reflection.quote_id} />
            <input type="hidden" name="book_id" value={id}/>
            <button>Save Reflection</button>
        </form>
    </main>
    )
}
export default EditReflectionPage