var firebaseRef = firebase.database().ref();
var usersRef = firebaseRef.child("USERS_TABLE");

refreshUserList();

function refreshUserList() {
    //reset the list every time
    document.getElementById("tbody").innerHTML = "";
    usersRef.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            //get data for each element in the db
            var firstname = childSnapshot.val().firstname;
            var lastname = childSnapshot.val().lastname;
            var email = childSnapshot.val().email;
            var priviledge = "User";

            if(childSnapshot.val().priviledge === 0){
              priviledge = "User";
            }
            else if(childSnapshot.val().priviledge === 1){
              priviledge = "Administrator";
            }

            var entry = '<tr><td>' + firstname + '</td><td>' + lastname + '</td><td>' + email + '</td><td>' + priviledge + '</td></tr>';
			      document.getElementById('tbody').innerHTML += entry;
        });
    });
}
