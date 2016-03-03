'use strict';
angular.module('App').factory('Player', function(FURL, $firebaseArray,$log, $firebaseObject, $firebaseAuth) {

  var ref = new Firebase(FURL);
  var authData = $firebaseAuth(ref).$getAuth();


  var Player = {

    email:function(){
      if (authData) {
        return authData.password.email;
      } else {
        console.log("Logged out");
      }
    },
    uid:function(){
      if (authData) {
        return authData.uid;
      } else {
        console.log("Logged out");
      }
    }

   }

  return Player;

});
