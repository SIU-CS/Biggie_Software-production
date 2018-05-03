/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  if (document.getElementById("myDropdown").classList.contains('show')){
    document.getElementById('menudrop').src='img/menudropclosed.png';
    document.getElementById("myDropdown").classList.remove("show");
  }
  else
  {
    document.getElementById('menudrop').src='img/menudropopen.png';
    document.getElementById("myDropdown").classList.add("show");
  }
}

function doSignOut(){
  firebase.auth().signOut();
  location.reload();
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (document.getElementsByClassName('myDropdown')[0].contains(event.target)){
    document.getElementById("myDropdown").classList.remove("show");
    document.getElementById('menudrop').src='img/menudropclosed.png';
    }
  }
