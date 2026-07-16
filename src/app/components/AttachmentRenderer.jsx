import AttachmentDeletionForm from "./AttachmentDeletionForm";
import { CldImage } from "next-cloudinary";

export const AttachmentRenderer = ({ attachment, quoteId, id }) => {
  const isImage = attachment.mime_type.startsWith("image/");
  const isAudio = attachment.mime_type.startsWith("audio/");
  const isVideo = attachment.mime_type.startsWith("video/");
  const isPdf = attachment.mime_type === "application/pdf";
  if (isImage) {
    return (
      <div>
        <a href={attachment.file_url} target="_blank" rel="noopener noreferrer">
          <CldImage
            src={attachment.file_url}
            alt={attachment.file_name}
            width={250}
          
          />
        </a>
       <AttachmentDeletionForm attachmentId={attachment.id} quoteId={quoteId.id} id={id}/>
      </div>
    );
  }
  if (isAudio) {
    return (
      <div>
        <audio controls style={{ width: "300px" }}>
          <source src={attachment.file_url} type={attachment.mime_type} />
        </audio>

        <p>{attachment.file_name}</p>

        <AttachmentDeletionForm attachmentId={attachment.id} quoteId={quoteId.id} id={id}/>
      </div>
    );
  }

  if (isVideo) {
  return (
    <div>
      <video
        controls
        width={300}
      >
        <source
          src={attachment.file_url}
          type={attachment.mime_type}
        />
        Your browser does not support the video element.
      </video>

      <p>{attachment.file_name}</p>
      
        <AttachmentDeletionForm attachmentId={attachment.id} quoteId={quoteId.id} id={id}/>
      
    </div>
  );
}
if (isPdf) {
  return (
    <div>
      <p>📄 {attachment.file_name}</p>

      <a
        href={attachment.file_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open PDF
      </a>
 
      <AttachmentDeletionForm attachmentId={attachment.id} quoteId={quoteId.id} id={id}/>
      
    </div>
  );
}
return (
  <div>
    <a
      href={attachment.file_url}
      target="_blank"
      rel="noopener noreferrer"
    >
       {attachment.file_name}
    </a>

    <AttachmentDeletionForm attachmentId={attachment.id} quoteId={quoteId.id} id={id}/>
  </div>
);
};
