var mainText = document.getElementById("mainText");
var submitButton = document.getElementById("submitButton");

var firebaseRef = firebase.database().ref();
var lotsRef = firebaseRef.child("Lots");
var lotARef = lotsRef.child("SIU Lot A/");
var lotBRef = lotsRef.child("SIU Lot B/");
var spot;
