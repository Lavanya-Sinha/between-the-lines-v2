import DeleteAttachment from "../actions/DeleteAttachment";

import SubmitButton from "@/app/components/ui/Button/SubmitButton";

const AttachmentDeletionForm = ({
    attachmentId,
    quoteId,
    id,
}) => {
    return (
        <form action={DeleteAttachment}>
            <input
                type="hidden"
                name="attachmentId"
                value={attachmentId}
            />

            <input
                type="hidden"
                name="quoteId"
                value={quoteId}
            />

            <input
                type="hidden"
                name="id"
                value={id}
            />

            <SubmitButton
                type="submit"
                variant="danger"
                loadingText="Deleting..."
            >
                Delete attachment
            </SubmitButton>
        </form>
    );
};

export default AttachmentDeletionForm;