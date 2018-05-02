myFunction();


function getCurrentSpot() {
    firebase.database().ref('/USERS_TABLE/' + guid + '/CURRENT_SPOT').once('value').then(function (snapshot) {

        var lot = snapshot.val().Lot;
        var spot = snapshot.val().Spot;
        document.getElementById('lot').value = lot;
        document.getElementById('spotNumber').value = spot;

    });
}
