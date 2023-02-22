import User from  "../models/usersModel.js";
import Post from  "../models/postsModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const {id: _id} = req.params;
        const user = await User.findById(_id);
        //this is to remove the password from the data and return newData
        const newData = Object.assign({}, user);
        delete newData._doc.password;
        delete newData._doc.email;

        res.status(200).json(newData._doc);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const options = {
        use_filename: true,
        folder: "Blogify/users",
        allowed_formats: ["jpg", "png", "jpeg"],
        quality: "auto:eco",
    };

    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        await user.validate();

        if(req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, options)
            user.image = result.secure_url;
        }

        await user.save();
        const userFound = user;
        const token = generateToken(userFound._id.toString());
        console.log(userFound, token);
        res.status(201).json({
            userFound,
            token: token
        });

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400).send(messages);
        } else {
            res.status(500).send(error);
        }
    }
  };

export const loginUser = async (req, res) => {
    const user = req.body;
    try {
        const userFound = await User.findOne({ email: user.email });
        if (userFound) {
            const isPasswordCorrect = await bcrypt.compare(user.password, userFound.password);
            if (isPasswordCorrect) {
                const token = generateToken(userFound._id);
                res.status(200).json({
                    userFound,
                    token: token
                });
            } else {
                res.status(404).json({ message: "Wrong password" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);

        res.status(409).json({ message: error.message });
    }
}

export const fetchSingleUser = async (req, res) => {
    try {
        const user = await User.findById(id);
        const userFound = await User.findById(user);
        res.status(200).json(userFound);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const fetchUserPosts = async (req, res) => {
    try {
        //this area get posts from user id 
        const user = req.params.id;
        const posts = await Post.find({creator: user}).populate('creator', 'username');
        if(posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: "No posts found" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const followUser = async (req, res) => {
    try {
        const {id: _id} = req.params;

        const user = req?.body?.currentUserId;

        await User.findByIdAndUpdate(_id, {$push: {followers: user}}, {new: true});

        await User.findByIdAndUpdate(user, {$push: {following: _id}}, {new: true});

        res.status(200).json({message: "Success"});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const unFollowUser = async (req, res) => {
    try {
        const {id: _id} = req.params;

        const user = req?.body?.currentUserId;

        await User.findByIdAndUpdate(_id, {$pull: {followers: user}}, {new: true});

        await User.findByIdAndUpdate(user, {$pull: {following: _id}}, {new: true});

        res.status(200).json({message: "Success"});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getFollowers = async (req, res) => {
    try {
        const {id: _id} = req.params;

        const user = await User.findById(_id).populate("followers", "username image");

        res.status(200).json(user.followers);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getFollowing = async (req, res) => {
    try {
        const {id: _id} = req.params;
        const user = await User.findById(_id).populate("following", "username image");

        res.status(200).json(user.following);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const options = {
        use_filename: true,
        folder: "Blogify/users",
        allowed_formats: ["jpg", "png", "jpeg"],
        quality: "auto:eco",
    };
    
    try {
        const {id: _id} = req.params;
        const user = {
            _id: _id,
            username: req.body.username,
            image: req.body.image,
            imageId: req.body.imageId,
        };

        if(req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, options)
            user.image = result.secure_url;
            user.imageId = result.public_id;

            if(req.body.imageId) {
                //this area remove the old avatar from cloudinary
                const oldUser = await User.findById(_id);
                const oldImage = oldUser.imageId;

                cloudinary.uploader.destroy(oldImage, {invalidate: true});
            }
        }

        //this area check username is already exist or not
        const userFound = await User.findOne({ username: user.username });
        
        if(userFound?._id.toString() === _id || userFound === null) {
            const updatedUser = await User.findByIdAndUpdate(_id, user, {new: true});
            res.status(200).json(updatedUser);
        } 
        else {
            res.status(409).json({ message: "Username already exist" });
        }

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id: _id} = req.params;
        const deletedUser = await User.findByIdAndDelete(_id);
        res.json(deletedUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const generateToken = (userId) => {
    return jwt.sign(
        { _id: userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1d" }
    );
}
    
