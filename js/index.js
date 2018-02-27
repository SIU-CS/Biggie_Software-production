var mainText = document.getElementById("mainText");
var submitButton = document.getElementById("submitButton");
var firebaseRef = firebase.database().ref();

function submitClick(){
	
	firebaseRef.child("SIU Lot A").child("Spot 102").set({
		Spot1: "Open",
		Spot2: "Occupied",
		Spot3: "Open",
		Spot4: "Open"
	});
	
	
	
}

function newClick() {
	var messageText = mainText.value;
	
	firebaseRef.getRef().child("Users").child("Username").remove();
	firebaseRef.child("Users").child("New").set(messageText);
}