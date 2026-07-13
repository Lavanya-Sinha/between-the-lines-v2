"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import { getResourceType } from "@/lib/cloudinary/getResourceType";
import prisma from "@/lib/prisma";
import DeleteFile from "@/lib/uploads/DeleteFile";
import { invalidateQuote } from "@/lib/cache/Invalidate";

const DeleteAttachment = async (formData) => {
  await requireWriteAccess()
  const attachmentId = formData.get("attachmentId");

  await requireOwnership("attachments", attachmentId);

  const attachment = await prisma.attachments.findUnique({
    where: {
      id: Number.parseInt(attachmentId),
    },
  });

  if (!attachment) {
  throw new Error("Attachment not found.");
}

  await DeleteFile(attachment.public_id, getResourceType(attachment.mime_type))

  await prisma.attachments.delete({
    where: {
      id: Number.parseInt(attachmentId),
    },
  });
  //redis cache invalidation
  await invalidateQuote(attachment.quote_id)
};
export default DeleteAttachment;
