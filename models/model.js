const mongoose = require("mongoose");

const author_obj = mongoose.model("Author",new mongoose.Schema({
    name: String,
    age: String,
    contact: String,
}));

const blog_obj = mongoose.model("Blog",new mongoose.Schema({
    title: String,
    content: String,
    blog_cat: String,
    likes:String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Authors"
    }
}));


module.exports = {
    blog_obj, author_obj
}
