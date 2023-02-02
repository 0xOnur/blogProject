import express from "express";
import { getUsers, createUser, getUserById, loginUser, deleteUser, updateUser } from "../controllers/usersController.js";

const userRoutes = express.Router();

//https://localhost:5000/users
userRoutes.route('/login').post(loginUser);

userRoutes.route('/register').post(createUser);

userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;