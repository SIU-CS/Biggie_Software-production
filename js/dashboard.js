firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = 'login.html'; //After successful login, user will be redirected to home.html
  } 
});
