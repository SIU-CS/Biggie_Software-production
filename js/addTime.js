window.onload = function() {
    firebase.database().ref('/USERS_TABLE/' + guid + '/CURRENT_SPOT').once('value').then(function (snapshot) {
        var spot = snapshot.val().Spot;

        document.getElementById('spotNumber').textContent = spot;
    });
}