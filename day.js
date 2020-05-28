//jshint esversion:6
exports.getDate = function (){
  var today = new Date();
  var currentDay = today.getDay();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
    return today.toLocaleString("en-US",options);

};
exports.getDay = function (){
  var today = new Date();
  var currentDay = today.getDay();

  var options = {
    weekday: "long",
  };
    return today.toLocaleString("en-US",options);

};
