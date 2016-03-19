'use strict';
angular.module('App').service('Weeks', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth) {

  var service = this;
  var ref = new Firebase(FURL + 'weeks');
 
  service.getWeeks = function(){
   return ref.once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  service.getActiveWeeks = function(){
    return ref.once('value').then(function(snapshot) {
      var j = snapshot.val();
      j = _.findLast(j,['isActive', true])
      return j;
    });
  }


});
