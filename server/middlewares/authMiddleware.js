import jwt from "jsonwebtoken";
import Post from "../models/postsModel.js";
import User from "../models/usersModel.js";


const postDeleteAuth = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const postId = req.headers.id;

        const post = await Post.findById(postId);

        const decoded = jwt.decode(token, process.env.JWT_SECRET);

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

const followUserAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.decode(token, process.env.JWT_SECRET);


        const userId = req.body.currentUserId;

        const targetFollow = req.params.id;

        const userFollowingList = await User.findById(decoded._id).select("following");

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if(err) {
                    res.status(401).json({ message: "Token is not valid" });
                }else {
                    if(decoded._id === userId) {
                        if(userFollowingList.following.includes(targetFollow)) {
                            res.status(401).json({ message: "You are already following this user" });
                        }else {
                            next();
                        }
                    }else {
                        res.status(401).json({ message: "You are not authorized to follow this user" });
                    }
                }
            });
        }else {
            res.status(401).json({ message: "No token, authorization denied" });
        }
    } catch (error) {
        console.log(error);
    }
}

const unFollowUserAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        const userId = req.body.currentUserId;


        const targetUnFollow = req.params.id;

        const userFollowingList = await User.findById(decoded._id).select("following");

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if(err) {
                    res.status(401).json({ message: "Token is not valid" });
                }else {
                    if(decoded._id === userId) {
                        if(userFollowingList.following.includes(targetUnFollow)) {
                            next();
                        }else {
                            res.status(401).json({ message: "You are not following this user" });
                        }
                    }else {
                        res.status(401).json({ message: "You are not authorized to unfollow this user" });
                    }
                }
            });
        }else {
            res.status(401).json({ message: "No token, authorization denied" });
        }
    } catch (error) {
        console.log(error);
    }
}

const updateUserAuth = async (req, res, next) => {
    try {
        const id = req.params.id;

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if(err) {
                    res.status(401).json({ message: "Token is not valid" });
                }else {
                    if(decoded._id === id) {
                        next();
                    }else {
                        res.status(401).json({ message: "You are not authorized to update this user" });
                    }
                }
            });
        }else {
            res.status(401).json({ message: "No token, authorization denied" });
        }

    } catch (error) {
        console.log(error);
    }
}

        

export { postDeleteAuth, followUserAuth, unFollowUserAuth, updateUserAuth };
