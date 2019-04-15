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


// Declaring initial variables
var name = "";
var destination = "";
var frequency = "";
var firstTrainTime = "";

var nextArrival = "";
//moment().add(frequency, 'minutes');

//console.log(nextArrival);



//var minutesAway = moment.duration(10000).minutes(2);
var currentTime = moment().format("HH:mm");

//var x = moment.duration(currentTime).minutes();
//console.log(x);

// START DISPLAYED CLOCK

// Variable for the clock that will display current time.
// The variable stores the div with the id clock.
const clock = document.getElementById("clock");

// Setting up the function to update the clock.
function updateClock () {
    // Declaring current time.
    const now = moment();
    // Setting the format for how the time should be displayed.
    const display = now.format("HH:mm:ssA");
    // Changing the contents of the clock div to display the time.
    clock.textContent = display;
}

// Set interval method that counts up by 1 second, using the updateClock
// function as an argument.
setInterval(updateClock, 1000);

// Calling on the updateClock function so that the clock starts as soon as the page loads.
updateClock();

// END OF DISPLAYED CLOCK


// Event listener for the submit button
document.querySelector("#add-train").addEventListener("click", function (event) {
    event.preventDefault();

    // Getting the input values from the textbox

    name = document.querySelector("#name").value.trim();
    destination = document.querySelector("#destination").value.trim();
    frequency = document.querySelector("#frequency").value.trim();
    firstTrainTime = document.querySelector("#first-train").value;


    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // Calling on the clear Input function to empty out the text boxes after the info has been submitted.
    clearInput();

});


// Setting up a clearInput function to clear the input fields after they've been submitted.
    function clearInput() {
        document.querySelector("#name").value = "";
        document.querySelector("#destination").value = "";
        document.querySelector("#frequency").value = "";
        document.querySelector("#first-train").value = "";
    }

//Capturing frequency


// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var snVal = snapshot.val();

    // full list of items to the well
    let fullListEl = document.querySelector("#table-list");
    let wellEl = document.createElement("tr");
    wellEl.classList.add("well");


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

// Still need a function to handle errors for when time is inputted in the wrong format.

};