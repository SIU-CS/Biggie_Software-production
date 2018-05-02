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
        var currentPath = window.location.pathname;
        var currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);

        var uid = user.uid;
        guid = uid;
        firebase.database().ref('/USERS_TABLE/' + uid).once('value').then(function(snapshot) {
          var firstname = snapshot.val().firstname;
          var lastname = snapshot.val().lastname;
          var priviledge = snapshot.val().priviledge;
          var profilepicture = snapshot.val().profilepicture;
          var credits = snapshot.val().credits;
          document.getElementById('firstname').innerHTML = firstname + " " + lastname;
          document.getElementById('firstnamemenu').innerHTML = firstname + " " + lastname;
          document.getElementById('menucredits').innerHTML = "Credits: " + credits;


          // If user is admin, add a button for admin panel
          if(priviledge === 1){
            document.getElementById('sidebar').innerHTML += '<a href="admin/index.html"><span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;Admin Panel</a>';
          }
          else {
            if(currentPage == "my_account.html")
            {
              document.getElementById('sidebar').innerHTML += '<a href="my_account.html" class="active"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;My Account</a>';
            }
            else
            {
              document.getElementById('sidebar').innerHTML += '<a href="my_account.html"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;My Account</a>';
            }
          }


          // Refresh current spot
          getCurrentSpot();
        });
      }
    });
