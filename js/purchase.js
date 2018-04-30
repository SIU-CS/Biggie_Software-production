var mainText = document.getElementById("mainText");
var submitButton = document.getElementById("submitButton");

var firebaseRef = firebase.database().ref();
var lotsRef = firebaseRef.child("Lots");
var lotARef = lotsRef.child("SIU Lot A/");
var lotBRef = lotsRef.child("SIU Lot B/");
var spot;

// function to populate html list every time new spot is taken
function saveToList(event) {
  firebase.database().ref('/USERS_TABLE/' + guid).once('value').then(function(snapshot) {
      var hours = document.querySelector('input[name="hours"]:checked').value;
      var credits = snapshot.val().credits;
      var rootRef = firebase.database().ref();
      var creditsRef = rootRef.child('/USERS_TABLE/' + guid + '/');

      if(+credits >= (+hours / 2)){
        if (event.which == 13 || event.keyCode == 13 || event.which == 1) { 
            // as the user presses the enter key, we will attempt to save the data
          var spotNumber = document.getElementById('spotNumber').value.trim();
          if (spotNumber.length == 3) {
            credits = +credits - (+hours / 2);
            creditsRef.update({
                "credits": credits
              });
              saveToFB(spotNumber);
              }
        document.getElementById('spotNumber').value = '';
        return false;
      }
    }
    else {
      document.getElementById("cardBody").innerHTML = '<p>You do not have enough credits!</p>';
      document.getElementById("circles").innerHTML = '';
      document.getElementById("formbtns").innerHTML = '<button type="button" id="nextBtn" class="continue" onclick="goBack()">Go Back</button>';
      document.getElementById("prevBtn").style.display = "none";
    }
    });
}

function goBack(){
  window.location = "purchase.html";
}
// Add spot to DB by lot reffrence
function saveToFB(spotNumber) {
    var inLot = document.getElementById('lot').value.trim();
    var hours = document.querySelector('input[name="hours"]:checked').value;

    var rootRef = firebase.database().ref();
    var parkingRef = rootRef.child('/USERS_TABLE/' + guid + '/CURRENT_SPOT');
    parkingRef.set({
        "Lot": inLot,
        "Spot": spotNumber,
        "Amount": hours * 60,
        "PurchaseTime": timeStamp()
    });

    lotsRef.child(inLot).child(spotNumber).set({
        TimeRem: (hours + ":00:00"),
        PaidOn: timeStamp()
    });
    window.location = "index.html";
    refreshList();
}

// Create time stamp
function timeStamp() {
    // Create a date object with the current time
    var now = new Date();

    // array with the current month, day and time
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

    // array with the current hour, minute and second
    var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

    // find AM or PM depending on the hour
    var suffix = time[0] < 12 ? "AM" : "PM";

    // Convert hour from military time
    time[0] = time[0] < 12 ? time[0] : time[0] - 12;

    // If hour is 0, set it to 12
    time[0] = time[0] || 12;

    // If seconds and minutes are less than 10, add a zero
    for (var i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = "0" + time[i];
        }
    }

    // Return the formatted string
    return date.join("/") + " " + time.join(":") + " " + suffix;
}

function expireTimeStamp(hours) {
    // Create a date object with the current time
    var now = new Date();
    now.setTime(now.getTime()+ (hours * 60*60*1000));
    // array with the current month, day and time
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

    // array with the current hour, minute and second
    var time = [now.getHours() , now.getMinutes(), now.getSeconds()];

    // find AM or PM depending on the hour
    var suffix = time[0] < 12 ? "AM" : "PM";

    // Convert hour from military time
    time[0] = time[0] < 12 ? time[0] : time[0] - 12;

    // If hour is 0, set it to 12
    time[0] = time[0] || 12;

    // If seconds and minutes are less than 10, add a zero
    for (var i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = "0" + time[i];
        }
    }

    // Return the formatted string
    return date.join("/") + " " + time.join(":") + " " + suffix;
}

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the crurrent tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    console.log("1");
    document.getElementById("prevBtn").style.display = "none";
  } else {
    console.log("2");
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    console.log("3");
    document.getElementById("formbtns").innerHTML = '<button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button><button type="button" id="nextBtn" class="continue" onclick="return saveToList(event)">Purchase</button>';
  } else {
    console.log("4");
    document.getElementById("formbtns").innerHTML = '<button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button><button type="button" id="nextBtn" class="continue" onclick="nextPrev(1)">Next</button>';
    document.getElementById("prevBtn").style.display = "none";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function getFormInfo(){
  var inLot = document.getElementById('lot').value.trim();
  var spotNumber = document.getElementById('spotNumber').value.trim();
  var hours = document.querySelector('input[name="hours"]:checked').value;

  document.getElementById("form-head").innerHTML = '<h4>Pay with Credits (' + (hours / 2) + ' Credits' + ')</h4>';
  document.getElementById("form-body").innerHTML = '<h5>Lot: ' + inLot + '</h5>' + '<h5>Spot: ' + ' ' + spotNumber + '</h5>' + '<h5>Hours: ' + ' ' + hours + '</h5><br>' + '<h5>Begin Time: ' + ' ' + timeStamp() + '</h5>' + '<h5>Expire Time: '  + expireTimeStamp(hours) + '</h5><br>';

}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    return false;
  }

  if(currentTab === 1){
    getFormInfo();
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function addCredits(){
  var newCredits = 0;

  var creditsVal = document.querySelector('input[name="credits"]:checked').value;

  var rootRef = firebase.database().ref();
  var creditsRef = rootRef.child('/USERS_TABLE/' + guid + '/');

  firebase.database().ref('/USERS_TABLE/' + guid).once('value').then(function(snapshot) {
      var credits = snapshot.val().credits;
      newCredits = +credits + +creditsVal;
      creditsRef.update({
          "credits": newCredits
      });
      document.getElementById("cardBody").innerHTML = '<p>Payment Successful!</p>';
    });
}
