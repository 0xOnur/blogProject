import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    subTitle: String,
    content: String,
    tag: String,
    image: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    },

{ 
    timestamps: {createdAt: 'created', updatedAt: 'updated'} 
});

const Post = mongoose.model("Post", postSchema);

export default Post;