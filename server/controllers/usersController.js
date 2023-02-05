import User from  "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
}

export const createUser = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.validate();
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
        { expiresIn: "1d" });
}

    
