"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import CreateAttachment from "@/app/actions/CreateAttachment";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";

const AttachmentsClient = ({ quoteId, id }) => {
    const router = useRouter();

    const selectedFileRef = useRef(null);

    const handleAttachmentSave = async () => {
        if (!selectedFileRef.current) {
            return;
        }

        const formData = new FormData();

        formData.append("quoteId", quoteId);
        formData.append(
            "file",
            selectedFileRef.current
        );
        formData.append("id", id);

        await CreateAttachment(formData);

        router.refresh();
    };

    const handleAttachmentChange = (event) => {
        selectedFileRef.current =
            event.target.files[0];
    };

    return (
        <Card
            className="
                flex
                flex-col
                gap-6
                p-6
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-3
                "
            >
                <div className="flex flex-col gap-1">
                    <h3
                        style={{
                            fontFamily:
                                "var(--font-heading)",

                            fontSize:
                                "var(--font-size-xl)",

                            fontWeight:
                                "var(--font-weight-semibold)",

                            lineHeight:
                                "var(--line-height-heading)",

                            color:
                                "var(--text-primary)",
                        }}
                    >
                        Add an attachment
                    </h3>

                    <p
                        style={{
                            fontFamily:
                                "var(--font-body)",

                            fontSize:
                                "var(--font-size-sm)",

                            fontWeight:
                                "var(--font-weight-normal)",

                            lineHeight:
                                "var(--line-height-body)",

                            color:
                                "var(--text-muted)",
                        }}
                    >
                        Keep images, PDFs, audio,
                        and videos alongside this
                        quote.
                    </p>
                </div>

                <label
                    htmlFor="attachment"
                    style={{
                        fontFamily:
                            "var(--font-body)",

                        fontSize:
                            "var(--font-size-sm)",

                        fontWeight:
                            "var(--font-weight-semibold)",

                        lineHeight:
                            "var(--line-height-body)",

                        color:
                            "var(--text-primary)",
                    }}
                >
                    Choose a file
                </label>

                <input
                    id="attachment"
                    type="file"
                    onChange={
                        handleAttachmentChange
                    }
                   className="w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-sm text-[var(--text-primary)]"
                />
            </div>

            <div className="self-start">
                <Button
                    type="button"
                    onClick={handleAttachmentSave}
                >
                    Save Attachment
                </Button>
            </div>
        </Card>
    );
};

export default AttachmentsClient;
