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

        const user = req?.body;

        //this area push the user id to the req params id followers array
        const follow = await User.findByIdAndUpdate(_id, {$push: {followers: user._id}}, {new: true});

        //this area push the req params id to the user id following array
        const following = await User.findByIdAndUpdate(user._id, {$push: {following: _id}}, {new: true});

        // console.log(following);
        res.status(200).json(following);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateUser = async (req, res) => {
    const {id: _id} = req.params;
    const user = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, user, {new: true});
        res.json(updatedUser);
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
    
