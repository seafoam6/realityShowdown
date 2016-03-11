'use strict';
angular.module('App').factory('Weeks', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth) {

  var weeksRef = new Firebase(FURL + 'weeks');
 
  var Weeks = {
    getWeeks:function(){
      return $firebaseArray(weeksRef);
    }
  }
  
  return Weeks;


});
