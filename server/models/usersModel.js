import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Lütfen kullanıcı adınızı girin."],
            unique: [true, "Bu kullanıcı adı zaten alınmış."],
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Lütfen mail adresinizi girin."],
            unique: [true, "Bu mail adresi zaten alınmış."],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Lütfen şifrenizi girin."],
            minlength: [6, "Şifreniz en az 6 karakterden oluşmalıdır."],
        },
        image: {
            type: String,
            default: "https://res.cloudinary.com/dwcw9iftp/image/upload/v1676581806/Blogify/users/user_318-790139_kkrcfr.avif",
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