'use strict';
angular.module('App').service('Queens', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth) {

  var service = this;
  var ref = new Firebase(FURL).child('queens');
  //get score ref

  service.test = function(){
    $log.log('help')
  }

});
