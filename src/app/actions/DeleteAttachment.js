"use server";

import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import { getResourceType } from "@/lib/cloudinary/getResourceType";
import prisma from "@/lib/prisma";
import DeleteFile from "@/lib/uploads/DeleteFile";
import { invalidateQuote } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const DeleteAttachment = async (formData) => {
  try {
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
     log({
      level: "INFO",
      file: "src/app/actions/DeleteAttatchment.js",
      operation: "Delete Attatchment",
      message: "Attatchment Deleted",
      userId: user.id,
    });
    
  } catch (error) {
     log({
      level: "ERROR",
      file: "src/app/actions/DeleteAttatchment.js",
      operation: "Delete Attatchment",
      message: "Failed to delete the attachment.",
      error: error.message,
    });

    throw error;
  }
};
export default DeleteAttachment;
