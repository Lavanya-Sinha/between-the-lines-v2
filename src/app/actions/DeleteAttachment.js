"use server";

import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

const DeleteAttachment = async (formData) => {
  const attachmentId = formData.get("attachmentId");

  await requireOwnership("attachments", attachmentId);

  const attachment = await prisma.attachments.findUnique({
    where: {
      id: Number.parseInt(attachmentId),
    },
  });

  const uploadPath = path.join(process.cwd(), "/public", attachment.file_url.slice(1))

  await fs.unlink(uploadPath)

  await prisma.attachments.delete({
    where: {
      id: Number.parseInt(attachmentId),
    },
  });
};
export default DeleteAttachment;
