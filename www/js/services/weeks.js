'use strict';
angular.module('App').factory('Weeks', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth) {

  var weeksRef = new Firebase(FURL + 'weeks');
  var weeks = $firebaseArray(weeksRef);
  var Weeks = {}
  
  return Weeks;


});
