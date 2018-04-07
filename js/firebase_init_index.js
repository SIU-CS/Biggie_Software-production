    // Initialize Firebase
    var guid = "";

    var config = {
        apiKey: "AIzaSyCWsMMBdgP5EfUmXMPRDBjyou8Rj8jzBDA",
        authDomain: "siu-parking-assistant-40a3f.firebaseapp.com",
        databaseURL: "https://siu-parking-assistant-40a3f.firebaseio.com",
        projectId: "siu-parking-assistant-40a3f",
        storageBucket: "siu-parking-assistant-40a3f.appspot.com",
        messagingSenderId: "869149371865"
    };
    firebase.initializeApp(config);

    // If not logged in then go to login page
    firebase.auth().onAuthStateChanged(user => {
      if(!user) {
        window.location = 'login.html';
      }
      else
      // If someone is logged in, get the uid and place infomation
      {
        var uid = user.uid;
        guid = uid;
        firebase.database().ref('/USERS_TABLE/' + uid).once('value').then(function(snapshot) {
          var firstname = snapshot.val().firstname;
          var lastname = snapshot.val().lastname;
          var profilepicture = snapshot.val().profilepicture;
          document.getElementById('firstname').innerHTML = firstname + " " + lastname;

          getCurrentSpot();
        });
      }
    });
