import {Router} from "express"
import { loginUser, logoutUser, refreshAccessToken, registerUser, updateProfilePhoto } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const inspector = (req, res, next) => {
    console.log('--- INSPECTOR LOG ---');
    console.log('Time:', new Date().toLocaleTimeString());
    console.log('Request Headers:', req.headers);
    console.log('--- END OF LOG ---');
    next();
};


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]
    ),
    registerUser

)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,logoutUser)

router.route("/refresh_token").post(refreshAccessToken)



export default router
