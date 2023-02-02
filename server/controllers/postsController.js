import Post from "../models/postsModel.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSinglePost = async (req, res) => {
    try {
        const {id : _id} = req.params;
        const post = await Post.findById(_id).populate('creator', 'username');
        // console.log(post);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    try {
        const post = req.body;
        const newPost = new Post(post);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

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