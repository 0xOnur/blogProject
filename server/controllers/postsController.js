import Post from "../models/postsModel.js";
import User from "../models/usersModel.js";


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
    try {
        const post = req.body;
        const newPost = new Post(post);
        await newPost.validate();
        await newPost.save();
        //this area adds the post id to the user's posts array
        const user = await User.findById(newPost.creator);
        user.posts.push(newPost._id);
        await user.save();

        res.status(201).json(newPost);
    } catch (error) {
        if (error) {
            const messages = Object.values(error.errors).map(error => error.message);
            return res.status(400).json({ messages });
          }
    }
};

export const updatePost = async (req, res) => {
    try {
        const {id : _id} = req.params;
        const post = req.body;
        const updatedPost = await Post.findByIdAndUpdate(_id, post, {new: true})
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    console.log("REQ PARAMS:  ", req.params);
    try {
        const {id : _id} = req.params;
        const deletedPost = await Post.findByIdAndDelete(_id);
        res.json(deletedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}