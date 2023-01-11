import express from "express";
import { getPosts, createPost } from "../controllers/posts.js";

const postRoutes = express.Router();

//https://localhost:5000/posts

postRoutes.get("/", getPosts);
postRoutes.post("/", createPost);


export default postRoutes;