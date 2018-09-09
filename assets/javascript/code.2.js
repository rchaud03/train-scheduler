$(document).ready(function(){

          // Initialize Firebase
          var config = {
            apiKey: "AIzaSyBDM99ZrsLu4tolJ_HzLJdqCH5b0O1RoJo",
            authDomain: "ronaldtestproject2.firebaseapp.com",
            databaseURL: "https://ronaldtestproject2.firebaseio.com",
            projectId: "ronaldtestproject2",
            storageBucket: "ronaldtestproject2.appspot.com",
            messagingSenderId: "976377199219"
          };
          firebase.initializeApp(config);
     
//new variables
var db = firebase.database();
var tFreq = 0;

//button action
$("#add-train-btn").on("click", function (event){
  event.preventDefault();

  var trainDest = $("#destination-input").val().trim();
  var trainName = $("#name-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();
  var trainStart = $("#initial-input").val().trim();

  //temporary object
  var newTrain = {
    name: trainName,
    destination: trainDest,
    frequency: trainFreq,
    startTime: trainStart
  }



  //add the values to database
  db.ref("/train-scheduler-homework").push(newTrain);

  console.log("NEW TRAIN ADDED to " + newTrain.destination + " every " + newTrain.frequency + " minutes via " + newTrain.name + " starting at " + trainStart);
  
  //Remember to clear fields
  $(".new-inputs").val("");

}) //$(#add-train-btn) ends

db.ref("/train-scheduler-homework").on("child_added", function (childSnapshot, prevChildKey) {

  var trainDest = childSnapshot.val().destination;
  var trainName = childSnapshot.val().name;
  var trainFreq = childSnapshot.val().frequency;
  var trainStart = childSnapshot.val().startTime;

  var time = moment();
  var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    
    console.log(firstTimeConverted);
    console.log("Current time is " + moment(time).format("hh:mm") );
    
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    console.log("Difference in time : " + diffTime);

  var tRemainder = diffTime % trainFreq;//tFrequency;
    console.log(tRemainder);

  var tMinutesTilTrain = trainFreq - tRemainder;
    console.log("Minutes til train: " + tMinutesTilTrain);

  var nextTrain = moment().add(tMinutesTilTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




  console.log(trainName + " traveling to " + trainDest + " every " + trainFreq + " starting as " + trainStart);

  $("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain.format("hh:mm") + "</td><td>" + tMinutesTilTrain + "</td><t/r>" );


})// db listener for child_added ends
});
