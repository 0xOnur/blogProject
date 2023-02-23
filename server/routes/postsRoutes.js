import express from "express";
import multer from "multer";
import { getPosts, createPost, getSinglePost, deletePost, updatePost } from "../controllers/postsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const postRoutes = express.Router();


const upload = multer({storage: multer.diskStorage({})});

//https://localhost:5000/posts

postRoutes.get("/", getPosts);
postRoutes.get("/:id", getSinglePost);
postRoutes.post("/", upload.single('image'), authMiddleware, createPost);
postRoutes.put("/:id", upload.single('image'), authMiddleware, updatePost);
postRoutes.delete("/:id", authMiddleware, deletePost);



export default postRoutes;