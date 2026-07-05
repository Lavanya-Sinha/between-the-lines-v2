"use server"

import fs from 'fs/promises'
import path from 'path';
import prisma from '@/lib/prisma';
import requireOwnership from '@/lib/auth/requireOwnership';

const CreateAttachment = async(formData)=>{
 const quoteId = formData.get("quoteId");
const file = formData.get("file");

await requireOwnership("quotes", quoteId)

const uniqueFileName = `${Date.now()}-${file.name}`;
const uploadPath = path.join(process.cwd(),"public", "uploads", uniqueFileName)

console.log(quoteId);
console.log(file);

const bytes = await file.arrayBuffer()
const buffer = Buffer.from(bytes)
console.log(buffer);

await fs.writeFile(uploadPath, buffer)

console.log("file saved");

await prisma.attachments.create({
    data:{
        file_name: file.name,
        file_url: `/uploads/${uniqueFileName}`,
        mime_type: file.type,
        quote_id: Number.parseInt(quoteId)
    }
})

}
export default CreateAttachment