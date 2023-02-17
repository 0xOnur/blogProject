import express from "express";
import multer from "multer";
import { getPosts, createPost, getSinglePost, deletePost, updatePost } from "../controllers/postsController.js";
import  {postDeleteAuth} from "../middlewares/authMiddleware.js";

const postRoutes = express.Router();


const upload = multer({storage: multer.diskStorage({})});

//https://localhost:5000/posts

postRoutes.get("/", getPosts);
postRoutes.get("/:id", getSinglePost);
postRoutes.post("/", upload.single('image'), createPost);
postRoutes.put("/:id", upload.single('image'), updatePost);
postRoutes.delete("/:id", postDeleteAuth, deletePost);



export default postRoutes;