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
          var email = snapshot.val().email;
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
              document.getElementById('userfirstname').value = firstname;
              document.getElementById('userlastname').value = lastname;
              document.getElementById('useremail').value = email;
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

    function updateAccountInfo(){
      var newfirstname;
      var newlastname;
      var user = firebase.auth().currentUser;

      newfirstname = document.getElementById('userfirstname').value;
      newlastname = document.getElementById('userlastname').value;
      newemail = document.getElementById('useremail').value;

      var rootRef = firebase.database().ref();
      var userRef = rootRef.child('/USERS_TABLE/' + guid);

      user.updateEmail(newemail).then(function() {
        userRef.update({
            "firstname": newfirstname,
            "lastname": newlastname,
            "email": newemail,
        });
        document.getElementById("cardBody").innerHTML = '<p>Successfully Updated Information!</p><br><button onClick="goMyAccount()" class="btn btn-default" type="button" id="quickstart-sign-up" name="updateinfo">Return</button>';
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("cardBody").innerHTML = '<p>Error: ' + errorMessage + '</p><br><button onClick="goMyAccount()" class="btn btn-default" type="button" id="quickstart-sign-up" name="updateinfo">Go Back</button>';      });
    }

    function changePassword(){
      newPassword = document.getElementById("newpassword").value;
      confirmNewPassword = document.getElementById("confirmnewpassword").value;
      if(newPassword === confirmNewPassword){
        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(function() {
          document.getElementById("cardBody").innerHTML = '<p>Successfully Updated Password!</p><br><button onClick="goMyAccount()" class="btn btn-default" type="button" id="quickstart-sign-up" name="updateinfo">Return</button>';
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          document.getElementById("cardBody").innerHTML = '<p>Error: ' + errorMessage + '</p><br><button onClick="goMyAccount()" class="btn btn-default" type="button" id="quickstart-sign-up" name="updateinfo">Go Back</button>';
        });
      }
    }

    function goMyAccount(){
      window.location = 'my_account.html';
    }
