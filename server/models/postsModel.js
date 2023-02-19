import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title."],
    },
    subTitle: {
        type: String,
    },
    content: {
        type: String,
        required: [true, "Please enter content."],
        minlength: [10, "Content must be at least 10 characters long. "],
    },
    tag: {
        type: String,
        required: [true, "Select topic. "],
    },
    image: String,
    imageId: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
},{ 
    timestamps: {createdAt: 'created', updatedAt: 'updated'} 
});

const Post = mongoose.model("Post", postSchema);

export default Post;