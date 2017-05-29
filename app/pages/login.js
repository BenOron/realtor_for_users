$(document).ready(function() {

  /* #####################################################################
   #
   #   Project       : Modal Login with jQuery Effects
   #   Author        : Rodrigo Amarante (rodrigockamarante)
   #   Version       : 1.0
   #   Created       : 07/29/2015
   #   Last Change   : 08/04/2015
   #
   ##################################################################### */
var messages = {
    verifyEmailIssue: "אנא לחץ על הקישור שנשלח למייל שלך"
};
  $(function() {

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function() {
      switch (this.id) {
        case "login-form":
          var $lg_username = $('#login_username').val();
          var $lg_password = $('#login_password').val();
          if ($lg_username == "ERROR") {
            msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
          }
          else {
            toggleSignIn();
            msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");

          }
          return false;
          break;
        case "lost-form":
          var $ls_email = $('#lost_email').val();
          if ($ls_email == "ERROR") {
            msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
          }
          else {
            msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
          }
          return false;
          break;
        case "register-form":
          var $rg_username = $('#register_username').val();
          var $rg_email = $('#register_email').val();
          var $rg_password = $('#register_password').val();
          if ($rg_username == "ERROR") {
            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
          }
          else {
            handleSignUp();
            // userChange();
            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
          }
          return false;
          break;
        default:
          return false;
      }
      return false;
    });

    $('#login_register_btn').click(function() {
      modalAnimate($formLogin, $formRegister)
    });
    $('#register_login_btn').click(function() {
      modalAnimate($formRegister, $formLogin);
    });
    $('#login_lost_btn').click(function() {
      modalAnimate($formLogin, $formLost);
    });
    $('#lost_login_btn').click(function() {
      modalAnimate($formLost, $formLogin);
    });
    $('#lost_register_btn').click(function() {
      modalAnimate($formLost, $formRegister);
    });
    $('#register_lost_btn').click(function() {
      modalAnimate($formRegister, $formLost);
    });

    function modalAnimate($oldForm, $newForm) {
      var $oldH = $oldForm.height();
      var $newH = $newForm.height();
      $divForms.css("height", $oldH);
      $oldForm.fadeToggle($modalAnimateTime, function() {
        $divForms.animate({
          height: $newH
        }, $modalAnimateTime, function() {
          $newForm.fadeToggle($modalAnimateTime);
        });
      });
    }

    function msgFade($msgId, $msgText) {
      $msgId.fadeOut($msgAnimateTime, function() {
        $(this).text($msgText).fadeIn($msgAnimateTime);
      });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
      var $msgOld = $divTag.text();
      msgFade($textTag, $msgText);
      $divTag.addClass($divClass);
      $iconTag.removeClass("glyphicon-chevron-right");
      $iconTag.addClass($iconClass + " " + $divClass);
      setTimeout(function() {
        msgFade($textTag, $msgOld);
        $divTag.removeClass($divClass);
        $iconTag.addClass("glyphicon-chevron-right");
        $iconTag.removeClass($iconClass + " " + $divClass);
      }, $msgShowTime);
    }
  });


  /**
   * Handles the sign in button press.
   */
  function toggleSignIn() {
    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    }
    else {
      var email = document.getElementById('login_username').value;
      var password = document.getElementById('login_password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        }
        else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END authwithemail]
    }
    checkAndUpdateVerifed(firebase.auth().currentUser);

  }
  /**
   * Handles the sign up button press.
   */
  function handleSignUp() {
    var email = document.getElementById('register_email').value;
    var password = document.getElementById('register_password').value;
    //var userName = document.getElementById('register_username').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }


    registerUserAndWaitEmailVerification(email, password, false);
    // Sign in with email and pass.
    // [START createwithemail]
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // [START_EXCLUDE]
    //   if (errorCode == 'auth/weak-password') {
    //     alert('The password is too weak.');
    //   } else {
    //     alert(errorMessage);
    //   }
    //   console.log(error);
    //   // [END_EXCLUDE]
    // });
    // // [END createwithemail]


  }

  function registerUserAndWaitEmailVerification(email, password, showWaitUI) {
    return new Promise(function(resolve, reject) {
      let interval = null;

      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        user => {
          user.sendEmailVerification().then(
            () => {
              if (showWaitUI) showWaitUI();
              interval = setInterval(() => {
                user.reload().then(
                  () => {
                    if (interval && user.emailVerified) {
                      clearInterval(interval);
                      interval = null;
                      resolve(user);
                    }
                  }, error => {
                    if (interval) {
                      clearInterval(interval);
                      interval = null;
                      console.log('registerUserAndWaitEmailVerification: reload failed ! ' + error.message + ' (' + error.code + ')');
                      reject(error);
                    }
                  }
                );
              }, 1000);
            }, error => {
              console.log('registerUserAndWaitEmailVerification: sendEmailVerification failed ! ' + error.message + ' (' + error.code + ')');
              reject(error);
            });
        }, error => {
          console.log('registerUserAndWaitEmailVerification: createUserWithEmailAndPassword failed ! ' + error.message + ' (' + error.code + ')');
          reject(error);
        }
      );
    });
  }

  // Once a user is created with the email/login
  // Notify when he/she is logged in
  firebase.auth().onAuthStateChanged(user => {
      checkAndUpdateVerifed(user);
      if (user && user.emailVerified) {
        var userProfile={};
        userProfile.displayName = user.displayName;
        userProfile.email = user.email;
       userProfile.emailVerified = user.emailVerified;
        userProfile.photoURL = user.photoURL;
        userProfile.isAnonymous = user.isAnonymous;
       userProfile.uid = user.uid;
        userProfile.providerData = user.providerData;
         firebase.database().ref('users/' + user.uid).set(userProfile).catch(function(error){
             console.log("error catch" + error)
        });
        updateLogon(userProfile);
      }
      else {
        $("#profileNav").hide();
        $("#userNameLogin").text("כניסה/הרשמה");
        $("#clsBtn").click();
        $("#userBtn").click(function() {
          $("#login-modal").show();
        })
      }

    }
  );


  function checkAndUpdateVerifed(user){
      // Get a reference to the database service
        var database = firebase.database();
        if (user && !user.emailVerified) {
          firebase.database().ref('users/' + user.uid).set({
            emailVerified: true
          }).catch(function(error){
            $("#success").text(messages.verifyEmailIssue);
             console.log("error catch" + error);
               firebase.auth().signOut();
               $(".profileUser").hide();
               return 
        })
           $(".profileUser").show();
          
        }
        
      
  }




  function updateLogon(user) {
    $("#clsBtn").click();
    $("#login-modal").remove();
    $('.modal-backdrop').remove();
    $("#userNameLogin").text("התחל");
    $("#profileUsername").text(user.displayName === null ? user.email.substring(0, user.email.lastIndexOf("@")) : user.displayName);
    $("#profileEmeil").text(user.email);
    $("#profileFullUsername").text(user.email.split('@')[0]);
    $("#profileNav").show();
    $("#userBtn").click(function() {
      window.location = './pages/buyerSellerPage.html';
    })
    $("#signOut").click(function() {
      logout();

    })


  }

  function logout() {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      window.location.reload()

    }, function(error) {
      console.error('Sign Out Error', error);
    });

  }

  /**
   * Sends an email verification to the user.
   */
  function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      // alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
    $("#loginBtn").click();
    $("#success").text(" שנשלח לכתובת " + firebase.auth().currentUser.email + "אנא לחץ על הקישור");
  }

  function sendPasswordReset() {
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      }
      else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
  }
  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
  function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      // [START_EXCLUDE silent]
      // document.getElementById('quickstart-verify-email').disabled = true;
      // [END_EXCLUDE]
    /*  if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;*/
        // [START_EXCLUDE]
        //  document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        //document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');

       /* if (!emailVerified) {

          // document.getElementById('quickstart-verify-email').disabled = false;
        }*/
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
    //document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    // document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    // document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    //document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
  }
  window.onload = function() {
    initApp();
  };
});