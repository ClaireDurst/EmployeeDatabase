// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDRActcblTk603YwlL8SJIxxGtl8kL0NLk",
    authDomain: "employeedatabase-6b05f.firebaseapp.com",
    databaseURL: "https://employeedatabase-6b05f.firebaseio.com",
    projectId: "employeedatabase-6b05f",
    storageBucket: "employeedatabase-6b05f.appspot.com",
    messagingSenderId: "981650249963"
  };
  firebase.initializeApp(config);

function monthsWorked(startDate){
  var today = new Date();
  var started = new Date(startDate[2], parseInt(startDate[1])-1, startDate[0]);
  return Math.floor((today-started)/2629746000);
}

function appendToTable(name, role, startDate, monthlyRate, months, billed){
  var $table = $("#employeetable");
  var $tableRow = $("<tr>");
  $tableRow.append("<td>" + name + "</td>");
  $tableRow.append("<td>" + role + "</td>");
  $tableRow.append("<td>" + startDate + "</td>");
  $tableRow.append("<td>" + months + "</td>");
  $tableRow.append("<td>" + monthlyRate + "</td>");
  $tableRow.append("<td>" + billed + "</td>");
  $table.append($tableRow);
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
  
    $("#employeename").val("");
    $("#employeerole").val("");
    $("#startdate").val("");
    $("#monthlyrate").val("");

    databaseref.ref().push({
      name:name,
      role:role,
      startDate:startDate,
      monthlyRate:monthlyRate,
      months:months,
      billed:billed
    });
  });

  databaseref.ref().on("child_added", function(childSnapshot){
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().role);
      console.log(childSnapshot.val().startDate);
      console.log(childSnapshot.val().monthlyRate);
      console.log(childSnapshot.val().months);
      console.log(childSnapshot.val().billed);
      appendToTable( childSnapshot.val().name, childSnapshot.val().role, childSnapshot.val().startDate, childSnapshot.val().monthlyRate, childSnapshot.val().months, childSnapshot.val().billed)

  });

});
