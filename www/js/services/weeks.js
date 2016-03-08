'use strict';
angular.module('App').service('Weeks', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth) {

  var service = this

  var weeksRef = new Firebase(FURL + 'weeks');

  service.getWeeks = function(){
    return weeksRef.once('value').then(function(snapshot) {
      // The Promise was "fulfilled" (it succeeded).
      return $log.log(snapshot.val());
    }, function(error) {
      // The Promise was rejected.
      console.error(error);
    });
  }

  



});
