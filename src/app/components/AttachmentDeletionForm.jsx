import DeleteAttachment from "../actions/DeleteAttachment";

import Button from "@/app/components/ui/Button";

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

            <Button
                type="submit"
                variant="danger"
            >
                Delete attachment
            </Button>
        </form>
    );
};

export default AttachmentDeletionForm;