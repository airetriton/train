 $(document).ready(function(){

 // Initialize Firebase

var config = {
    apiKey: "AIzaSyD8bFhoXOQ2GU2HtOouda_WwS76m-7ZPt4",
    authDomain: "train2018-4f015.firebaseapp.com",
    databaseURL: "https://train2018-4f015.firebaseio.com",
    projectId: "train2018-4f015",
    storageBucket: "train2018-4f015.appspot.com",
    messagingSenderId: "306034462970"
  };
  firebase.initializeApp(config);


var database = firebase.database();

  
$("#submit").on("click", function() {

//--variable values--//
    var name = $('#nameInput').val().trim();
    var dest = $('#destInput').val().trim();
    var time = $('#timeInput').val().trim();
    var freq = $('#freqInput').val().trim();

//--Firebase--//
database.ref().push({
    name: name,
    dest: dest,
    time: time,
    freq: freq,
    timeAdded: firebase.database.ServerValue.TIMESTAMP
});
  //--NO REFRESH!!!--//
  $("input").val('');
    return false;
});

//--child fuction--//
database.ref().on("child_added", function(childSnapshot){
  var name = childSnapshot.val().name;
  var dest = childSnapshot.val().dest;
  var time = childSnapshot.val().time;
  var freq = childSnapshot.val().freq;

  console.log("Name: " + name);
  console.log("Destination: " + dest);
  console.log("Time: " + time);
  console.log("Frequency: " + freq);

  //--convert train time--//
  var freq = parseInt(freq);
  //--current time--//
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment().format('HH:mm'));
  var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years');
  console.log("DATE CONVERTED: " + dConverted);
  var trainTime = moment(dConverted).format('HH:mm');
  console.log("TRAIN TIME : " + trainTime);
  
  var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
  var tDifference = moment().diff(moment(tConverted), 'minutes');
  console.log("DIFFERENCE IN TIME: " + tDifference);
  //--time left--//
  var tRemainder = tDifference % freq;
  console.log("TIME REMAINING: " + tRemainder);
  //--time in minutes until next train--//
  var minsAway = freq - tRemainder;
  console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
  //--next train--//
  var nextTrain = moment().add(minsAway, 'minutes');
  console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));
  //--console.log(ish)--//

 //--table data--//
$('#currentTime').text(currentTime);
$('#trainTable').append(
    "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
    "</td><td id='destDisplay'>" + childSnapshot.val().dest +
    "</td><td id='freqDisplay'>" + childSnapshot.val().freq +
    "</td><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
    "</td><td id='awayDisplay'>" + minsAway  + ' minutes until arrival' + "</td></tr>");
 },

function(errorObject){
    console.log("Read failed: " + errorObject.code)
});

});