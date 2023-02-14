import Post from "../models/postsModel.js";
import User from "../models/usersModel.js";
import cloudinary from "cloudinary";
import fs from "fs";


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('creator', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSinglePost = async (req, res) => {
    //this area get single post and when post not found return 404
    const {id : _id} = req.params;
    try {
        const post = await Post.findById(_id).populate('creator', 'username');
        if(!post) {
            return res.status(404).json({ message: "Post not found or deleted" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const options = {
        use_filename: true,
        folder: "Blogify/Posts",
        allowed_formats: ["jpg", "png", "jpeg"],
        quality: "auto:eco",
    };

    try {
        const newPost = new Post({
            title: req.body.title,
            subTitle: req.body.subTitle,
            tag: req.body.tag,
            content: req.body.content,
            creator: req.body.creator,
            image: "null",
        });

        const result = await cloudinary.v2.uploader.upload(req.file.path, options)

        //this area clear a file after upload
        fs.unlink(`uploads/posts/${req.file.filename}`, (error) => {
            if (error) {
              console.error(error);
            } else {
              console.log(`uploads/posts/${req.file.filename} was deleted.`);
            }
        });
        //

        newPost.image = result.secure_url;
        
        await newPost.validate();
        await newPost.save();

        //this area adds the post id to the user's posts array
        const user = await User.findById(newPost.creator);
        user.posts.push(newPost._id);
        await user.save();
        //

        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = async (req, res) => {
    const options = {
        use_filename: true,
        folder: "Blogify/Posts",
        allowed_formats: ["jpg", "png", "jpeg"],
        quality: "auto:eco",
    };

    try {
        const {id : _id} = req.params;

        console.log(req?.file?.path);

        const newPost = {
            title: req.body.title,
            subTitle: req.body.subTitle,
            tag: req.body.tag,
            content: req.body.content,
            creator: req.body.creator,
            image: req.body.image,
        };


        const oldPost = await Post.findById(_id);
        if(newPost.image === oldPost.image) {
            const updatedPost = await Post.findByIdAndUpdate(_id, newPost, {new: true})
            console.log(newPost, 90);
            res.json(updatedPost);
        }else {
            const result = await cloudinary.v2.uploader.upload(req.file.path, options)
            newPost.image = result.secure_url;

            //this area clear a file after upload
            fs.unlink(`uploads/posts/${req.file.filename}`, (error) => {
                if (error) {
                console.error(error);
                } else {
                console.log(`uploads/posts/${req.file.filename} was deleted.`);
                }
            });
            //
            console.log(newPost, 99);

            const updatedPost = await Post.findByIdAndUpdate(_id, newPost, {new: true})
            res.json(updatedPost);
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    console.log("REQ PARAMS:  ", req.params);
    try {
        const {id : _id} = req.params;
        const deletedPost = await Post.findByIdAndDelete(_id);
        //this area removes the post id from the user's posts array
        const user = await User.findById(deletedPost.creator);
        user.posts = user.posts.filter(post => post.toString() !== _id);
        await user.save();

        res.json(deletedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}