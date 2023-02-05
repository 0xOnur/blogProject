import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Lütfen başlık girin."],
    },
    subTitle: {
        type: String,
    },
    content: {
        type: String,
        required: [true, "Lütfen içerik girin."],
        minlength: [10, "İçerik en az 10 karakterden oluşmalıdır."],
    },
    tag: {
        type: String,
        required: [true, "Lütfen bir kategori seçin."],
    },
    image: String,
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