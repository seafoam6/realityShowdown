'use strict';
angular.module('App').service('Weeks', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth) {

  var service = this

  var weeksRef = new Firebase(FURL + 'weeks');

  service.getWeeks = function(){
    
  }

  



});
