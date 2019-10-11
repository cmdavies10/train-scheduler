var firebaseConfig = {
    apiKey: "AIzaSyC_aTez1Tqex3y01w88ov8FWT8B3wzMVFY",
    authDomain: "train-scheduler-f5d77.firebaseapp.com",
    databaseURL: "https://train-scheduler-f5d77.firebaseio.com",
    projectId: "train-scheduler-f5d77",
    storageBucket: "train-scheduler-f5d77.appspot.com",
    messagingSenderId: "200013639274",
    appId: "1:200013639274:web:60ff1ce06312492fcaa413"
};
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        train: trainName,
        destination: trainDestination,
        trainFirst: trainFirst,
        frequency: frequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log("to database ===")
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.trainFirst);
    console.log(newTrain.frequency);

    alert("train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().trainFirst;
    var frequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log("database call ====")
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirst);
    console.log(frequency);
  
    // Prettify the first train time
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
    // To calculate the next arrival
    // var nextArrival = "";
    // console.log(nextArrival);
  
    // Calculate minutes away
    var convertedTrainTime = moment(trainFirst, "hh:mm").subtract(1, "years");
    console.log("converted train time ====")
    console.log(convertedTrainTime);

    var currentTime = moment();
    console.log("current time ===");
    console.log(currentTime);

    var minutesAway = moment().diff(moment(convertedTrainTime), "minutes");
    console.log("minutes away ===");
    console.log(moment().format("HH:mm"));
    console.log(minutesAway);

    var tRemainder = minutesAway % frequency;
    console.log(tRemainder);

    var minutesTilTrain = frequency - tRemainder;
    console.log(minutesTilTrain);

    var nextArrival = moment().add(minutesTilTrain, "minutes");
    var catchTrain = moment(nextArrival).format("HH:mm");
  
    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesTilTrain)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });