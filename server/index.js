import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();


app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());

app.use("/posts", postRoutes);

app.use("/users", userRoutes);

app.use(cookieParser());


const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error.message);
});