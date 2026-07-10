"use server";

import requireOwnership from "@/lib/auth/requireOwnership";
import { getResourceType } from "@/lib/cloudinary/getResourceType";
import prisma from "@/lib/prisma";
import DeleteFile from "@/lib/uploads/DeleteFile";

const DeleteAttachment = async (formData) => {
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
};
export default DeleteAttachment;
