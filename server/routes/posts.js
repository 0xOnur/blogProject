import express from "express";
import { getPosts, createPost, getSinglePost, deletePost, updatePost } from "../controllers/posts.js";

const postRoutes = express.Router();

//https://localhost:5000/posts

postRoutes.get("/", getPosts);
postRoutes.get("/:id", getSinglePost);
postRoutes.post("/", createPost);
postRoutes.patch("/:id", updatePost);
postRoutes.delete("/:id", deletePost);



export default postRoutes;