"use server"

import prisma from '@/lib/prisma';
import requireWriteAccess from '@/lib/auth/requireWriteAccess';
import requireOwnership from '@/lib/auth/requireOwnership';
import SaveFile from '@/lib/uploads/SaveFile';
import { invalidateQuote } from '@/lib/cache/Invalidate';
import log from '@/lib/logging/logger';

const CreateAttachment = async(formData)=>{
try {
    const quoteId = formData.get("quoteId");
   const file = formData.get("file");
   
   await requireWriteAccess()
   
   await requireOwnership("quotes", quoteId)
   
   
   
   const saveFile = await SaveFile(file,"attachments")
   
   console.log("file saved");
   
  const user = await prisma.attachments.create({
       data:{
           file_name: saveFile.fileName,
           file_url: saveFile.fileUrl,
           mime_type: saveFile.mimeType,
           public_id : saveFile.publicId,
           quote_id: Number.parseInt(quoteId)
       }
   })
   //redis cache invalidation
   await invalidateQuote(quoteId)
    log({
      level: "INFO",
      file: "src/app/actions/CreateAttachment.js",
      operation: "Add Attachment",
      message: "Attachment Added",
      userId: user.id,
    });
} catch (error) {
    log({
      level: "ERROR",
      file: "src/app/actions/CreateAttachment.js",
      operation: "Add Attachment",
      message: "Failed to Add Attachment.",
      error: error.message,
    });

    throw error;
}
}
export default CreateAttachment