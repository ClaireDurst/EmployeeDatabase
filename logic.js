// Initialize Firebase
var config = {
  apiKey: "AIzaSyDRActcblTk603YwlL8SJIxxGtl8kL0NLk",
  authDomain: "employeedatabase-6b05f.firebaseapp.com",
  databaseURL: "https://employeedatabase-6b05f.firebaseio.com",
  projectId: "employeedatabase-6b05f",
  storageBucket: "",
  messagingSenderId: "981650249963"
};
firebase.initializeApp(config);

function monthsWorked(startDate){
  var today = new Date();
  var started = new Date(startDate[2], parseInt(startDate[1])-1, startDate[0]);
  return Math.floor((today-started)/2629746000);
}

var databaseref = firebase.database();
$(document).ready(function(){
  $("#submitbtn").on("click", function(){
    var name = $("#employeename").val().trim();
    var role = $("#employeerole").val().trim();
    var startDate = $("#startdate").val().trim();
    var monthlyRate = $("#monthlyrate").val().trim();
    var months = monthsWorked(startDate.split("/"));
    var billed = months * monthlyRate;
    var $table = $("#employeetable");
    var $tableRow = $("<tr>");
    $tableRow.append("<td>" + name + "</td>");
    $tableRow.append("<td>" + role + "</td>");
    $tableRow.append("<td>" + startDate + "</td>");
    $tableRow.append("<td>" + months + "</td>");
    $tableRow.append("<td>" + monthlyRate + "</td>");
    $tableRow.append("<td>" + billed + "</td>");
    $table.append($tableRow);
    $("#employeename").val("");
    $("#employeerole").val("");
    $("#startdate").val("");
    $("#monthlyrate").val("");
  });

});
