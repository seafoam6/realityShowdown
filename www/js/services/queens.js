'use strict';
angular.module('App').service('Queens', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth) {

  var service = this;
  var ref = new Firebase(FURL).child('queens');
  //get score ref

  service.test = function(){
    $log.log('help')
  }

  //get all queens
  service.getAllQueens = function(){
    return ref.once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  //add queen
    service.addQueen = function(queenToAdd){
    
  }

  //remove queen

  //get active queens

  //get all inactive queens

  //set queen inactive

  //set queen active

});
