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
    formData.append("file", selectedFileRef.current);
    formData.append("id", id);

    await CreateAttachment(formData);

    router.refresh();
  };

  const handleAttachmentChange = (event) => {
    selectedFileRef.current = event.target.files[0];
  };

  return (
    <Card className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Attach a file</label>

        <input type="file" onChange={handleAttachmentChange} />

        <p className="text-sm text-[var(--textMuted)]">
          Images, PDFs, audio, and videos are supported.
        </p>
      </div>

      <div className="self-start">
        <Button onClick={handleAttachmentSave}>Save Attachment</Button>
      </div>
    </Card>
  );
};

export default AttachmentsClient;
