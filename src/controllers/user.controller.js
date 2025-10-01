import asyncHandler from "../utils/asyncHandler.js"

import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async(req,res) =>{
   // get datails from frontend 
   // validation - not empty
   // check if user already exits: username, email
   // check for images, check for avatar
   // upload them on cloudinary, avatar
   // create user object , create entry on db 
   // remove password and refesh token field from response
   // check for user creation 
   // return response

   const {fullName, email , username , password} =req.body
   console.log("Email: ",email);
   
   if(
    [fullName,username,email,password].some((field) => 
        field?.trim() === "" )
   ){
    throw new ApiError(409, "All field are required ")
   } 

   const existedUser = await User.findOne({
    $or: [{username},{email}]
   })
   if(existedUser){
    throw new ApiError(409, "User with email and username is already exits ")
   }
   
   const avatarLocalPath = req.files?.avatar[0]?.path;

//    const coverImageLocalPath = req.files?.coverImage[0]?.path;

   let coverImageLocalPath;
   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
    coverImageLocalPath = req.files?.coverImage[0]?.path
   }

   if(!avatarLocalPath){  
    throw new ApiError(400, "Avatar file required for your server")
   }


  const avatar = await  uploadCloudinary(avatarLocalPath);
  const coverImage = await  uploadCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(500, "Avatar file required for cloudinary" )

  }

   const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase( )
  })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser){
    throw new ApiError(500, "User is not created in db")
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User register successfully")
   )
    
    

})
 
export {registerUser}