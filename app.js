//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

var items = ["Buy Food","Cook Food","Eat Food"];
var workItems = [];
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",function(req,res){
  var today = new Date();
  var currentDay = today.getDay();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleString("en-US",options);
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
app.listen(3000,function(){
  console.log("Server started on port 3000");
});
