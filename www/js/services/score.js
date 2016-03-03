'use strict';
angular.module('App').factory('Score', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth) {

  var ref = new Firebase(FURL);



  var Score = {
    test: function(vote){
      $log.log(vote)
    }
  }

  return Score;

});
