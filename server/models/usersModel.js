import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
        },
        image: {
            type: String,
            default: "https://res.cloudinary.com/dwcw9iftp/image/upload/v1678146137/Blogify/users/user_318-790139_kkrcfr_qdifb9.jpg",
        },
        imageId: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: { createdAt: "created", updatedAt: "updated" } }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("User", userSchema);

export default User;