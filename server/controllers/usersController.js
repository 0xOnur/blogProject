import User from  "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

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
        { expiresIn: "30d" });
}

    
