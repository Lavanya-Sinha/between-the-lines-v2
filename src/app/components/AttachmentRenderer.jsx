import AttachmentDeletionForm from "./AttachmentDeletionForm";
import CloudinaryImage from "./CloudinaryImage";

export const AttachmentRenderer = ({
    attachment,
    quoteId,
    id,
}) => {
    const isImage =
        attachment.mime_type.startsWith("image/");

    const isAudio =
        attachment.mime_type.startsWith("audio/");

    const isVideo =
        attachment.mime_type.startsWith("video/");

    const isPdf =
        attachment.mime_type ===
        "application/pdf";

    const deletionForm = (
        <AttachmentDeletionForm
            attachmentId={attachment.id}
            quoteId={quoteId.id}
            id={id}
        />
    );

    if (isImage) {
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-3
                    rounded-lg
                    p-3
                "
                style={{
                    backgroundColor:
                        "var(--surface)",

                    border:
                        "var(--border-subtle) solid var(--border)",

                    boxShadow:
                        "var(--shadow-card)",

                    borderRadius:
                        "var(--radius-lg)",
                }}
            >
                <a
                    href={attachment.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <CloudinaryImage
                        src={attachment.file_url}
                        alt={
                            attachment.file_name
                        }
                        width={250}
                        height={300}
                    />
                </a>

                {deletionForm}
            </div>
        );
    }

    if (isAudio) {
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-3
                    rounded-lg
                    p-3
                "
                style={{
                    backgroundColor:
                        "var(--surface)",

                    border:
                        "var(--border-subtle) solid var(--border)",

                    boxShadow:
                        "var(--shadow-card)",

                    borderRadius:
                        "var(--radius-lg)",
                }}
            >
                <audio
                    controls
                    style={{
                        width: "300px",
                        maxWidth: "100%",
                    }}
                >
                    <source
                        src={attachment.file_url}
                        type={
                            attachment.mime_type
                        }
                    />
                </audio>

                <p
                    style={{
                        fontFamily:
                            "var(--font-body)",

                        fontSize:
                            "var(--font-size-sm)",

                        fontWeight:
                            "var(--font-weight-medium)",

                        lineHeight:
                            "var(--line-height-body)",

                        color:
                            "var(--text-secondary)",
                    }}
                >
                    {attachment.file_name}
                </p>

                {deletionForm}
            </div>
        );
    }

    if (isVideo) {
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-3
                    rounded-lg
                    p-3
                "
                style={{
                    backgroundColor:
                        "var(--surface)",

                    border:
                        "var(--border-subtle) solid var(--border)",

                    boxShadow:
                        "var(--shadow-card)",

                    borderRadius:
                        "var(--radius-lg)",
                }}
            >
                <video
                    controls
                    width={300}
                    style={{
                        maxWidth: "100%",
                    }}
                >
                    <source
                        src={attachment.file_url}
                        type={
                            attachment.mime_type
                        }
                    />

                    Your browser does not
                    support the video element.
                </video>

                <p
                    style={{
                        fontFamily:
                            "var(--font-body)",

                        fontSize:
                            "var(--font-size-sm)",

                        fontWeight:
                            "var(--font-weight-medium)",

                        lineHeight:
                            "var(--line-height-body)",

                        color:
                            "var(--text-secondary)",
                    }}
                >
                    {attachment.file_name}
                </p>

                {deletionForm}
            </div>
        );
    }

    if (isPdf) {
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-3
                    rounded-lg
                    p-3
                "
                style={{
                    backgroundColor:
                        "var(--surface)",

                    border:
                        "var(--border-subtle) solid var(--border)",

                    boxShadow:
                        "var(--shadow-card)",

                    borderRadius:
                        "var(--radius-lg)",
                }}
            >
                <p
                    style={{
                        fontFamily:
                            "var(--font-body)",

                        fontSize:
                            "var(--font-size-sm)",

                        fontWeight:
                            "var(--font-weight-medium)",

                        lineHeight:
                            "var(--line-height-body)",

                        color:
                            "var(--text-primary)",
                    }}
                >
                    📄 {attachment.file_name}
                </p>

                <a
                    href={attachment.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily:
                            "var(--font-body)",

                        fontSize:
                            "var(--font-size-sm)",

                        fontWeight:
                            "var(--font-weight-semibold)",

                        color:
                            "var(--primary)",
                    }}
                >
                    Open PDF
                </a>

                {deletionForm}
            </div>
        );
    }

    return (
        <div
            className="
                flex
                flex-col
                gap-3
                rounded-lg
                p-3
            "
            style={{
                backgroundColor:
                    "var(--surface)",

                border:
                    "var(--border-subtle) solid var(--border)",

                boxShadow:
                    "var(--shadow-card)",

                borderRadius:
                    "var(--radius-lg)",
            }}
        >
            <a
                href={attachment.file_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    fontFamily:
                        "var(--font-body)",

                    fontSize:
                        "var(--font-size-sm)",

                    fontWeight:
                        "var(--font-weight-semibold)",

                    color:
                        "var(--primary)",
                }}
            >
                {attachment.file_name}
            </a>

            {deletionForm}
        </div>
    );
};
