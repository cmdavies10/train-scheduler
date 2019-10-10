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


