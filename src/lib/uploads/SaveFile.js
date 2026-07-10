import { Readable } from "stream";
import cloudinary from "../cloudinary/CloudinaryClient";

const SaveFile = async (file, folder) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream);
  });

  return {
    fileName: file.name,
    publicId: result.public_id,
    fileUrl: result.secure_url,
    mimeType: file.type,
  };
};

export default SaveFile;