import User from  "../models/usersModel.js";
import Post from  "../models/postsModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import {generateToken, updateToken } from "./jwtControl.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const newData = users.map((user) => {
            const data = Object.assign({}, user);
            delete data._doc.password;
            delete data._doc.email;
            return data._doc;
        });
        res.status(200).json(newData);
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

    const checkIfUsernameExists = async (username) => {
        const user = await User.findOne({ username: username });
        return user;
    };
    
    const checkIfEmailExists = async (email) => {
        const user = await User.findOne({ email: email });
        return user;
    };

    try {
        const emailRegex = /^\S+@\S+\.\S+$/;
        const validEmailFormat = emailRegex.test(req.body.email);
      
        if (!validEmailFormat) {
          return res.status(400).json({ message: "Invalid email format" });
        }

        req.body.username = req.body.username.replace(/\s/g, '');


        const existingUsername = await checkIfUsernameExists(req.body.username);
        if (existingUsername) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const existingEmail = await checkIfEmailExists(req.body.email);
        if (existingEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        if (req.body.password.length < 6) {
            return res.status(409).json({ message: "Password must be at least 6 characters" });
        }
        
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
        const userId = userFound._id;
        const tokens = generateToken({"_id": userId});

        res.status(200).json({
            userFound: userFound,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
  };

export const loginUser = async (req, res) => {
    const user = req.body;
    try {
        const userFound = await User.findOne({ email: user.email });

        if (userFound) {
            const isPasswordCorrect = await bcrypt.compare(user.password, userFound.password);
            if (isPasswordCorrect) {
                const userFoundJson = userFound.toJSON();
                delete userFoundJson.password;
                const userId = userFoundJson._id;
                const tokens = generateToken({"_id": userId});
                res.status(200).json({
                    userFound: userFoundJson,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken
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

export const tokenIsExpired = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        const result = await updateToken(refreshToken);
        if(result.accessToken && result.refreshToken) {
            res.status(200).json(result);
        }else {
            res.status(401).json({ message: "Unauthorized" });
        }

    }catch (error) {
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
        const token  = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;

        const {id: _id} = req.params;

        const user = req?.body?.currentUserId;

        const userFollowingList = await User.findById(userId).select("following");

        if(userId === user) {
            if(userFollowingList.following.includes(_id)) {
                res.status(409).json({ message: "You are already following this user" });
            }else {
                await User.findByIdAndUpdate(_id, {$push: {followers: user}}, {new: true});

                await User.findByIdAndUpdate(user, {$push: {following: _id}}, {new: true});
        
                res.status(200).json({message: "Success"});
            }
        }else {
            res.status(409).json({ message: "You are not authorized to do this" });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const unFollowUser = async (req, res) => {
    try {
        const token  = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;
        
        const {id: _id} = req.params;

        const user = req?.body?.currentUserId;

        const userFollowingList = await User.findById(userId).select("following");

        if(userId === user) {
            if(userFollowingList.following.includes(_id)) {
                await User.findByIdAndUpdate(_id, {$pull: {followers: user}}, {new: true});

                await User.findByIdAndUpdate(user, {$pull: {following: _id}}, {new: true});
        
                res.status(200).json({message: "Success"});
            }else {
                res.status(409).json({ message: "You are not following this user" });
            }
        }else {
            res.status(409).json({ message: "You are not authorized to do this" });
        }
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

    const token  = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;
    
    try {
        const {id: _id} = req.params;
        req.body.username = req.body.username.replace(/\s/g, '');

        if(userId === _id) {
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
        }else {
            res.status(409).json({ message: "You can't update other user" });
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
