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

          var entry = '<tr><td>' + key + '</td><td>' + timeStamp + '</td></tr>';
          document.getElementById('rbody').innerHTML += entry;
      });
  });
}
