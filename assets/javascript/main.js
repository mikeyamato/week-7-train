/* 
 
*/

$(function(){  // this is shorthand for '$(document).ready(function(){'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqab-Woz9CGvKHBdLfjbNwueXZL_4e5FU",
    authDomain: "homework-7-train.firebaseapp.com",
    databaseURL: "https://homework-7-train.firebaseio.com",
    projectId: "homework-7-train",
    storageBucket: "",
    messagingSenderId: "95220893348"
  };
  firebase.initializeApp(config);

var dataRef = firebase.database(); // why is this here? what does this do? 

// pulls data from form

	$("form").submit(function(event){
		event.preventDefault();   // this line prevents the form entries from disappearing. must include 'event' in the above function
		
		var trainNameData = $("#trainName").val().trim();
		var destData = $("#dest").val().trim();
		var firstTrainData = moment($("#firstTrain").val().trim(),"HH:mm").subtract(10,"years").format("X");
		var frequencyData = $("#frequency").val().trim();

		console.log(trainNameData);
		console.log(destData);
		console.log(firstTrainData);
		console.log(frequencyData);

		dataRef.ref().push({
			name: trainNameData,
			destination: destData,
			firstTrain: firstTrainData,
			frequency: frequencyData

		})

	alert("Choo choo...added");

// clears all fields
	
		$("#trainName").val("");
		$("#dest").val("");
		$("#firstTrain").val("");
		$("#frequency").val("");
	
	});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {

// Log everything that's coming out of snapshot

	var trainNameData = childSnapshot.val().name;
	var destData = childSnapshot.val().destination;
	var firstTrainData = childSnapshot.val().firstTrain;
	var frequencyData = childSnapshot.val().frequency;

	console.log(trainNameData);
	console.log(destData);
	console.log(firstTrainData);
	console.log(frequencyData);

	var timeLeft = moment().diff(moment.unix(firstTrainData),"minutes")%frequencyData;

	var minAway = frequencyData - timeLeft;

	var nextArrival = moment().add(minAway, "m").format("hh:mm A"); 

$("#schedule-table > tbody").append("<tr><td>" + trainNameData + "</td><td>" + destData + "</td><td>" + frequencyData + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

});

	
// pull data from firebase



});






