import {v2 as cloudinary} from "cloudinary"

import fs from "fs "

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDIANRY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (localFilePath) => {
    try {
         const response =  await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto "
        })
        console.log("file is uploaded successfuly on cloudinary" , response.url ) ; 
        return response; 
    } catch (error) {
        fs.unlinksync(localFilePath ) // remove the locally save temporary 
                                    // file as the upload operation got failed 
        return null;
        
    }

}

export {uploadCloudinary }