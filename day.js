//jshint esversion:6
module.exports = getDate;

function getDate(){
  var today = new Date();
  var currentDay = today.getDay();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
    var day = today.toLocaleString("en-US",options);
  return day;
}
