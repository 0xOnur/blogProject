import Post from "../models/postsModel.js";
import User from "../models/usersModel.js";
import cloudinary from "cloudinary";

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
        folder: "Blofigy/posts",
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
            image: null,
        });

        await newPost.validate();

        if(req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, options);
            newPost.image = result.secure_url;
        }

        await newPost.save();

        //this area adds the post id to the user's posts array
        const user = await User.findById(newPost.creator);
        user.posts.push(newPost._id);
        await user.save();
        //

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const options = {
        folder: "Blogify/posts",
        allowed_formats: ["jpg", "png", "jpeg"],
        quality: "auto:eco",
    };

    try {
        const {id : _id} = req.params;


        const newPost = new Post({
            _id: _id,
            title: req.body.title,
            subTitle: req.body.subTitle,
            tag: req.body.tag,
            content: req.body.content,
            creator: req.body.creator,
            image: req.body.image,
            imageId: req.body.imageId,
        });
        await newPost.validate();

        if(req.file) {
            const result = await cloudinary.v2.uploader.upload(req?.file?.path, options);

            newPost.image = result.secure_url;
            newPost.imageId = result.public_id;

            //this area removes the old image from cloudinary
            const oldPost = await Post.findById(_id);
            const oldImageId = oldPost.imageId;

            cloudinary.uploader.destroy(oldImageId, {invalidate: true}, (error, result) => {
                console.log(result, error);
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(_id, newPost, {new: true});

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
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