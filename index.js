const express = require('express');
const fs= require('fs');
const path=require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",function(req,res){
    fs.readdir("./files",function(err,files){
        res.render("index",{files: files});
    })
})

app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect("/");
     });
})

app.get("/file/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
        res.render("readmore",{data: data, title: req.params.filename});
    })
});

app.listen(8000,function(req,res){
    console.log("server is running")
})

// fs.readfile , writefile and many are their in which you use backticks
// req.params.filename for dynamic routing