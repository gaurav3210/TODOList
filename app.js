//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
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
name:"AddItem"
});
const item2 = new Item({
  name:"UpdateItem"
});
const item3 = new Item({
  name:"DeleteItem"
});

const predefinedItems = [item1,item2,item3];

const ListSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    Items: [itemSchema]
});

const list = mongoose.model("List",ListSchema);

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
const listName = req.body.list;

 const newItem = new Item({
     name:nextItemName
 });
 if(listName=="Today") {
     newItem.save();
     res.redirect("/");
 }else{
     list.findOne({name:listName},function (err,foundList) {
         foundList.Items.push(newItem);
         foundList.save();
         res.redirect("/"+listName);
     })
 }
});

app.post("/delete",function (req,res) {
    const deleteItemId = req.body.checkbox;
    const listName = req.body.listName;
    if(listName=="Today") {
        Item.findByIdAndRemove(deleteItemId, function (err) {
            if (err) {
                console.log("error occur");
            } else {
                console.log("Deleted checked item");
            }

        });
        res.redirect("/");
    }else{
        list.findOneAndUpdate({name:listName},{$pull:{Items:{_id:deleteItemId}}},function (err,foundList) {
                   if(!err){
                       res.redirect("/"+listName);
                   }
        });
    }
})

app.get("/:customListName",function (req,res) {
    const customListName = _.capitalize(req.params.customListName);
    list.findOne({name:customListName},function (err,listFound) {
          if(err)
              console.log("error occurred");
          else
          {
              if(!listFound)
              {
                  const listMake = new list({
                      name: customListName,
                      Items: predefinedItems
                  });
                  listMake.save();
                 res.redirect("/"+customListName);
              }
              else{
                  res.render("list",{listTitle: listFound.name, newListItems: listFound.Items});
              }

          }
    });



})

app.listen(3000,function(){
  console.log("Server started on port 3000");
});
