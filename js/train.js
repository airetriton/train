jQuery( document ).ready(function() {

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyBrKRK3IILQqDZ8PXyic0RSPg8CSZr6hNM",
    authDomain: "timesheet-ac051.firebaseapp.com",
    databaseURL: "https://timesheet-ac051.firebaseio.com",
    projectId: "timesheet-ac051",
    storageBucket: "timesheet-ac051.appspot.com",
    messagingSenderId: "813706748107"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    var userRef = database.ref("/user");


    // Capture Button Click
    $("#add-user").on("click", function(event) {
    	console.log("add-user click")
      // Don't refresh the page!
      event.preventDefault();


      // Code in the logic for storing and retrieving the most recent user.
      // var calcDate = 'getMonth' + 'getFullYear';
      var name = $("#name-input").val().trim();
      var role = $("#role-input").val().trim();
      var startDate = $("#startDate-input").val().trim();
      var monthlyRate = $("#monthlyRate-input").val().trim();

      var calcDate = $("#startDate-input");
      var dateFormat = "MM/DD/YYYY";
      var calcNewStartDate = moment(calcDate, dateFormat);
      var calcToday = moment();

      console.log(calcNewStartDate.diff(calcToday, "months"));

	 var data = {
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
      };
      console.log(data)
      userRef.push(data);
    });
    
    var empBilled = empMOnths*empRate;
    
    // Create Firebase "watcher" Hint: .on("value")
    // Don't forget to handle the "initial load"

    function errorHandler(error){
      console.log(error);
    }

    userRef.on("child_added", function(snapshot){
      console.log(snapshot.val());

      var data = snapshot.val();

      $("#name-display").text(data.name);
      $("#role-display").text(data.role);
      $("#startDate-display").text(data.startDate);
      $("#monthsWorkd-display").text(data.monthsWorked);
      $("#monthlyRate-display").text(data.monthlyRate);
      $("#totalBilled-display").text(data.totalBilled);

      $('#myTable > tbody:last-child').append('<tr><td>' + data.name + '</td><td> '+ data.role +' </td><td> '+ data.startDate +' </td><td> ' + data.monthlyRate + '</td>');

      // var nameSpan = $("<div>")

      // nameSpan.text(data.name);

      // $("#full-member-list").append()
    }, errorHandler)


    // Create Error Handling







		



});