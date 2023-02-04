const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();


mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/BlogDb");

const {
    blog_obj,author_obj
} = require("./models/model.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

app.get("/",async(req, res) => {
    const data = await blog_obj.find({});
    res.render("index.ejs",{bdata:data});
});

app.get("/addnew",async(req, res) => {
    const data3 = await author_obj.find({});
    res.render("addnew.ejs",{adata:data3});
});

app.get("/authors",async(req, res) => {
    const data2 = await author_obj.find({});
    res.render("authors.ejs",{adata:data2});
});

app.get("/addauthor",(req, res) => {
    res.render("addAuthor.ejs");
});

app.post("/save",(req, res) => {
    const data = new blog_obj(req.body);
    data.save()
    res.redirect('/')

});

app.post("/save2",(req, res) => {
    const data = new author_obj(req.body);
    data.save()
    res.redirect('/authors')

});

//Delete Method
app.get("/deleteblog/:id", async(req,res)=>{
    await blog_obj.findByIdAndDelete(req.params.id);
    res.redirect("/")
})

//Edit Method
app.get("/edit/:id/editForm", async(req,res)=>{
    const data = await blog_obj.findById(req.params.id);
    res.render("editForm",{data})
})

app.get("/back",(req, res) => {
    res.redirect('/')

});

app.get("/backauth",(req, res) => {
    res.redirect('/authors')

});

app.post("/edit/:id", async(req,res)=>{
    await blog_obj.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/");
})

app.listen(3000,show = ()=>{
    console.log('http://localhost:3000');
});