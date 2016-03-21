'use strict';
angular.module('App').service('Score', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth, Users) {

  var service = this;
  var ref = new Firebase(FURL);

  service.giveParticipationPoints = function(vote, playerId, pointBlock){
    //$log.log('give participation', vote)

    new Promise(function(resolve, reject){
      resolve(Users.getUserByTwitter(playerId))
    }).then(function(userId){

      new Promise(function(resolve, reject){
        resolve(service.checkIfScoreBlockExists(userId,pointBlock))
      }).then(function(result){
        if (!result){
          ref.child('players/' + userId + '/points').push(pointBlock)
        } else {
          $log.log("already scored!")
        }
      })

      
 
    })
    
    //need to find playerID here
    //ref.child('players/' + playerId + '/score').push(pointBlock)
  },

  service.checkIfScoreBlockExists = function(userId,pointBlock){
    //$log.log('called')

    return ref.child('players/' + userId + '/points').once('value').then(function(snapshot){
      var j = snapshot.val()

      var result;
      _.forEach(j, function(value, index, collection){
        //$log.log(value.type, pointBlock.type, value.week, pointBlock.week)
        if(value.type == pointBlock.type && value.week == pointBlock.week){
           result = true
        } else {
          result = false
        }
      })
      //$log.log('result', result)
      return result
    })


  }


});
