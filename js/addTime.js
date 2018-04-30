myFunction();


function myFunction(spot) {
    firebase.database().ref('/USERS_TABLE/' + guid + '/CURRENT_SPOT').once('value').then(function (snapshot) {
        var spot = snapshot.val().Spot;
        var lot = snapshot.val().Lot;
        
    });

        //window.alert(this.spot + this.lot);
    
    //this line is assinging "undefined" val to spotNumber
     document.getElementById('spotNumber').value = this.spot;
    
   
}




//todo function to calc the time added to the current spot
function addTimeToSpot(){
    
}