"use server"

import prisma from '@/lib/prisma';
import requireWriteAccess from '@/lib/auth/requireWriteAccess';
import requireOwnership from '@/lib/auth/requireOwnership';
import SaveFile from '@/lib/uploads/SaveFile';
import { invalidateQuote } from '@/lib/cache/Invalidate';

const CreateAttachment = async(formData)=>{
 const quoteId = formData.get("quoteId");
const file = formData.get("file");

await requireWriteAccess()

await requireOwnership("quotes", quoteId)



const saveFile = await SaveFile(file,"attachments")

console.log("file saved");

await prisma.attachments.create({
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
}
export default CreateAttachment