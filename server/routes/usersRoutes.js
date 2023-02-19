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

import  {followUserAuth, unFollowUserAuth} from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

const upload = multer({storage: multer.diskStorage({})});

//https://localhost:5000/users
userRoutes.route('/login').post(loginUser);

userRoutes.post("/register", upload.single('image'), createUser);

userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", followUserAuth, followUser);
userRoutes.put("/unfollow/:id", unFollowUserAuth, unFollowUser);

userRoutes.get("/:id/followers", getFollowers);
userRoutes.get("/:id/following", getFollowing);

userRoutes.get("/:id/posts", fetchUserPosts);

userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;