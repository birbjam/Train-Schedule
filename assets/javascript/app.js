window.onload = function() {

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_Bxnl17YLlb1jrlsZexnVuAN9Opji1qc",
    authDomain: "train-schedule-deb54.firebaseapp.com",
    databaseURL: "https://train-schedule-deb54.firebaseio.com",
    projectId: "train-schedule-deb54",
    storageBucket: "train-schedule-deb54.appspot.com",
    messagingSenderId: "977108646385"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var frequency = "";
var nextArrival = 0;
var firstTrainTime = "";
var minutesAway = 0;
var currentDate = moment().format("MM/DD/YYYY");


// Capture Button Click
document.querySelector("#add-train").addEventListener("click", function (event) {
    //event.preventDefault();

    // Grabbed values from text boxes

    name = document.querySelector("#name").value.trim();
    destination = document.querySelector("#destination").value.trim();
    frequency = document.querySelector("#frequency").value.trim();
    firstTrainTime = document.querySelector("#first-train").value;

    //console.log(moment.duration("01/01/2018"));


    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var snVal = snapshot.val();

    // Console.loging the last user's data


    // full list of items to the well
    let fullListEl = document.querySelector("#table-list");
    let wellEl = document.createElement("tr");
    wellEl.classList.add("well");

    // <td>Mark</td>
    let nameEl = document.createElement("td");
    nameEl.classList.add("train-name");
    nameEl.innerText = snVal.name;

    wellEl.appendChild(nameEl);

    let destinationEl = document.createElement("td");
    destinationEl.classList.add("train-destination");
    destinationEl.innerText = snVal.destination;
    wellEl.appendChild(destinationEl);

    let frequencyEl = document.createElement("td");
    frequencyEl.classList.add("train-frequency");
    frequencyEl.innerText = snVal.frequency;
    wellEl.appendChild(frequencyEl);

    let nextArrivalEl = document.createElement("td");
    nextArrivalEl.classList.add("train-next-arrival");
    nextArrivalEl.innerText = snVal.nextArrival;
    wellEl.appendChild(nextArrivalEl);

    let minutesAwayEl = document.createElement("td");
    minutesAwayEl.classList.add("train-minutes-away");
    minutesAwayEl.innerText = snVal.minutesAway;
    wellEl.appendChild(minutesAwayEl);

    fullListEl.appendChild(wellEl);




    // Handle the errors
}, function (errorObject) {
    console.log(`Errors handled: ${errorObject.code}`);
});

};