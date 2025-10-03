import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import {uploadCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    // Step 1: Get title and description from the request body
    const { title, discription } = req.body;

    // Step 2: Validate that title and description are not empty
    if (!title || !discription) {
        throw new ApiError(400, "Title and discription are required");
    }

    // Step 3: Get the local paths for the video and thumbnail files from Multer
    const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    // Step 4: Validate that both files were uploaded
    if (!videoFileLocalPath) {
        throw new ApiError(400, "Video file is required");
    }
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required");
    }

    // Step 5: Upload both files to Cloudinary
    const videoFile = await uploadCloudinary(videoFileLocalPath);
    const thumbnail = await uploadCloudinary(thumbnailLocalPath);

    // Step 6: Validate that the uploads were successful
    if (!videoFile?.url || !thumbnail?.url) {
        throw new ApiError(500, "Failed to upload video or thumbnail to Cloudinary");
    }

    // Step 7: Create a new video document in the database
    const video = await Video.create({
        title,
        discription,
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        duration: videoFile.duration, // Cloudinary provides video duration
        owner: req.user._id // Get the owner from the authenticated user
    });
    // console.log(req.user.fullName);

    // Step 8: Send a success response with the created video data
    return res.status(201).json(
        new ApiResponse(201, video, "Video published successfully")
    );
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}