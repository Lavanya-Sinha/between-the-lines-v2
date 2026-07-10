import DeleteAttachment from "../actions/DeleteAttachment";

const AttachmentDeletionForm = ({attachmentId, quoteId, id})=>{
    return(
      <div>
        <form action={DeleteAttachment}>
          <input type="hidden" name="attachmentId" value={attachmentId} />
          <input type="hidden" name="quoteId" value={quoteId} />
          <input type="hidden" name="id" value={id} />
          <button>Delete</button>
        </form>
      </div>
    )
}
export default AttachmentDeletionForm