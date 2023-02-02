import jwt from "jsonwebtoken";
import Post from "../models/postsModel.js";

const postDeleteAuth = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const postId = req.headers.id;

        const post = await Post.findById(postId);

        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        console.log("decoded_jwt ;", decoded?._id);
        console.log("postCreatorId ;", post?.creator?.toHexString());
        
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if(err) {
                    res.status(401).json({ message: "Token is not valid" });
                }else {
                    if(decoded._id === post.creator.toHexString()) {
                        next();
                    }else {
                        res.status(401).json({ message: "You are not authorized to delete this post" });
                    }
                }
            });
        }else {
            res.status(401).json({ message: "No token, authorization denied" });
        }
    } catch (error) {
        console.log(error);

        res.status(401).json({ message: "Token is not valid" });
    }
}



export { postDeleteAuth };
