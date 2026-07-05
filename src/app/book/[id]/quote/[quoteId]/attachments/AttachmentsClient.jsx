"use client";

import { useRef } from "react";
import CreateAttachment from "@/app/actions/CreateAttachment";

const AttachmentsClient = ({quoteId, id}) => {
  const selectedFileRef = useRef(null);

  const handleAttachmentSave = async() => {
    const formData = new FormData();
    formData.append("quoteId",quoteId);
    formData.append("file",selectedFileRef.current);
    formData.append("id", id);
    for (const entry of formData.entries()) {
      console.log(entry);
    }
     await CreateAttachment(formData)
  };
  const handleAttachmentChange = (event) => {
    selectedFileRef.current = event.target.files[0];
  };
  return (
    <main>
      <input
        type="file"
        onChange={handleAttachmentChange}
      />
      <button onClick={handleAttachmentSave}>Save</button>
    </main>
  );
};
export default AttachmentsClient;
