"use server"

import prisma from '@/lib/prisma';
import requireOwnership from '@/lib/auth/requireOwnership';
import SaveFile from '@/lib/uploads/SaveFile';

const CreateAttachment = async(formData)=>{
 const quoteId = formData.get("quoteId");
const file = formData.get("file");

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

}
export default CreateAttachment