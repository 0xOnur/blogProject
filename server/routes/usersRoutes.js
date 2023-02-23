import express from "express";
import multer from "multer";
import { getUsers, 
    fetchUserPosts, 
    followUser, 
    getFollowers,
    getFollowing,
    unFollowUser, 
    createUser, 
    getUserById, 
    loginUser, 
    deleteUser, 
    updateUser 
} from "../controllers/usersController.js";

import  authMiddleware from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

const upload = multer({storage: multer.diskStorage({})});

//https://localhost:5000/users
userRoutes.route('/login').post(loginUser);


userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);

userRoutes.put("/follow/:id", authMiddleware, followUser);
userRoutes.put("/unfollow/:id", authMiddleware, unFollowUser);

userRoutes.get("/:id/followers", getFollowers);
userRoutes.get("/:id/following", getFollowing);

userRoutes.get("/:id/posts", fetchUserPosts);

userRoutes.post("/register", upload.single('image'), createUser);
userRoutes.put("/:id", upload.single('image'), authMiddleware, updateUser);

userRoutes.delete("/:id", deleteUser);

export default userRoutes;