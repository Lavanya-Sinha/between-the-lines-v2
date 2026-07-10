import cloudinary from "../cloudinary/CloudinaryClient"


const DeleteFile = async(publicId, resourceType)=>{
    if(!publicId){
    return ;
    }
    console.log("Deleting:", publicId);
    const result =  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
  console.log(result);
};
export default DeleteFile