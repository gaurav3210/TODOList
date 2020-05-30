//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema = new mongoose.Schema({
   name:{
     type:String,
     required:true
   }
});

const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
name:"BuyFood"
});
const item2 = new Item({
  name:"cookFood"
});
const item3 = new Item({
  name:"eatFood"
});

const predefinedItems = [item1,item2,item3];


app.get("/",function(req,res){

 Item.find(function (err,item) {
   if(item.length === 0){
     Item.insertMany(predefinedItems,function (err) {
  if(err)
  {
    console.log("ERROR OCCURRED");
  }else{
    console.log("Successfully implemented");
  }
     res.redirect("/");
  });

   }else {
     res.render("list", {listTitle: "Today", newListItems: item});
   }
 });


});

app.post("/",function(req,res){
 const nextItemName = req.body.newItem;

 const newItem = new Item({
     name:nextItemName
 });
 newItem.save();
 res.redirect("/");
});

app.get("/work",function(req,res){
  res.render("list",{listTitle:"Work",newListItems:workItems});
});


app.listen(3000,function(){
  console.log("Server started on port 3000");
});
