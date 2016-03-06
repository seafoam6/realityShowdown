'use strict';
angular.module('App').service('Player', function(FURL, $firebaseArray,$log, $firebaseObject, $firebaseAuth) {
  var service = this
  var ref = new Firebase(FURL);
  var PlayerArray = $firebaseArray(new Firebase(FURL + 'players'))
  //var authData = $firebaseAuth(ref).$getAuth();



  service.test = function(){
    $log.log('test')
  }

  service.getSinglePlayerRef = function(id){
    return $firebaseArray(new Firebase(FURL + 'players/' + id))
  }

  service.doesPlayerExist = function(){}




});
