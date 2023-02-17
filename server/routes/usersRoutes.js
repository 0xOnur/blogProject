import express from "express";
import multer from "multer";
import { getUsers, fetchUserPosts, followUser, createUser, getUserById, loginUser, deleteUser, updateUser } from "../controllers/usersController.js";

import  {followUserAuth} from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

const upload = multer({ dest: 'uploads/users/' })

//https://localhost:5000/users
userRoutes.route('/login').post(loginUser);

userRoutes.post("/register", upload.single('image'), createUser);

userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", followUserAuth, followUser);
userRoutes.get("/:id/posts", fetchUserPosts);

userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;