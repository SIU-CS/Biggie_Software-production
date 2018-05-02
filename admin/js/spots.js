var firebaseRef = firebase.database().ref();
var lotsRef = firebaseRef.child("Lots");
var lotARef = lotsRef.child("SIU Lot A/");
var lotBRef = lotsRef.child("SIU Lot B/");
var spot;
refreshList();

function refreshList() {

    //reset the list every time
    document.getElementById("tbody").innerHTML = "";
    lotARef.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            
            //get data for each element in the db
            var childData = childSnapshot.val();
            var timeStamp = childSnapshot.val().PaidOn;
            var timerem = childSnapshot.val().TimeRem;
    
            var d1 = new Date(); // Get the time right now
            d1 = d1.toISOString().substr(11, 8);
            d1 = minutesToMillis(d1);
            var d2 = new Date(timeStamp); // Get the purchase time
            d2 = d2.toISOString().substr(11, 8);
            d2 = minutesToMillis(d2);
            var diff = (d1 - d2); // Minus those
             
            timerem = minutesToMillis(timerem); // Change amount paid for to milliseconds
             
           // window.alert(key  + " "+(timerem + diff)); //test alert
            
            if ((timerem - diff) < 0) {
                var spotRemoved = lotARef.child(key);
                spotRemoved.remove();
            }

            var entry = '<tr><td>' + key + '</td><td>' + timeStamp + '</td></tr>';
            document.getElementById('tbody').innerHTML += entry;
        });
    });

    document.getElementById("rbody").innerHTML = "";
    lotBRef.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;

            //get data for each element in the db
            var childData = childSnapshot.val();
            var timeStamp = childSnapshot.val().PaidOn;
            var timerem = childSnapshot.val().TimeRem;

            var d1 = new Date(); // Get the time right now
            d1 = d1.toISOString().substr(11, 8);
            d1 = minutesToMillis(d1);
            var d2 = new Date(timeStamp); // Get the purchase time
            d2 = d2.toISOString().substr(11, 8);
            d2 = minutesToMillis(d2);
            var diff = (d1 - d2); // Minus those
            timerem = minutesToMillis(timerem); // Change amount paid for to milliseconds

            if ((timerem - diff) < 0) {
                var spotRemoved = lotBRef.child(key);
                spotRemoved.remove();
            }

            var entry = '<tr><td>' + key + '</td><td>' + timeStamp + '</td></tr>';

            document.getElementById('rbody').innerHTML += entry;
        });
    });
}

function minutesToMillis(minutes) {

    var a = minutes.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    return seconds;
}
