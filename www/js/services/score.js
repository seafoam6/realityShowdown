'use strict';
angular.module('App').service('Score', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth, Users) {

  var service = this;
  var ref = new Firebase(FURL);

  service.giveParticipationPoints = function(vote, playerId, pointBlock){
    //$log.log('give participation', vote)

    new Promise(function(resolve, reject){
      resolve(Users.getUserByTwitter(playerId))
    }).then(function(userId){
      $log.log('result', userId)

      //check if points exist
      //
      //
      //
      //
      //

      ref.child('players/' + userId + '/points').push(pointBlock)
    })
    
    //need to find playerID here
    //ref.child('players/' + playerId + '/score').push(pointBlock)
  }


});
