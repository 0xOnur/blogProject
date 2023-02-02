import express from "express";
import { getPosts, createPost, getSinglePost, deletePost, updatePost } from "../controllers/postsController.js";
import  {postDeleteAuth} from "../middlewares/authMiddleware.js"

const postRoutes = express.Router();

//https://localhost:5000/posts

postRoutes.get("/", getPosts);
postRoutes.get("/:id", getSinglePost);
postRoutes.post("/", createPost);
postRoutes.put("/:id", updatePost);
postRoutes.delete("/:id", postDeleteAuth, deletePost);



export default postRoutes;