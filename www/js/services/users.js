'use strict';
angular.module('App').factory('Users', function(FURL, $firebaseArray,$log, $localStorage, $firebaseObject, $firebaseAuth) {
  
   var usersRef = new Firebase(FURL+'players');
    var users = $firebaseArray(usersRef);

    var Users = {
      getProfile: function(uid){
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function(uid){

        return users.$loaded().$getRecord(uid).id;
      },
      all: users
    };

    return Users;


});
