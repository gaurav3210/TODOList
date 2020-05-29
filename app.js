//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/day.js");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});
app.get("/",function(req,res){

  let day = date.getDate();
  res.render("list",{listTitle:day, newListItems:items});


});

app.post("/",function(req,res){
 var item = req.body.newItem;
if(req.body.Submit=="Work"){
  workItems.push(item);
  res.redirect("/work");
}else{
  items.push(item);
  res.redirect("/");
}
});

app.get("/work",function(req,res){
  res.render("list",{listTitle:"Work",newListItems:workItems});
});

app.post("/work",function(req,res){

  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about",function(req,res){
  res.render("about");
})
app.listen(3000,function(){
  console.log("Server started on port 3000");
});
