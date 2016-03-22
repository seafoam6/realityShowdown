'use strict';
angular.module('App').service('Score', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth, Users) {

  var service = this;
  var ref = new Firebase(FURL);

  service.giveParticipationPoints = function(vote, playerId, pointBlock){

    new Promise(function(resolve, reject){
      resolve(Users.getUserByTwitter(playerId))
      }).then(function(userId){


        new Promise(function(resolve, reject){
          resolve(service.checkIfScoreBlockExists(userId,pointBlock))
          }).then(function(result){
          if (_.isNil(result)){
            ref.child('players/' + userId + '/points').push(pointBlock)
          } else {
            $log.log("already scored!")
          }
        })

    })
  },

  service.BullseyePoints = function(fbVote, playerId, pointBlock, weekLoser){


    var hashKey = Object.keys(fbVote)
    var vote = fbVote[hashKey]
    var guesses = fbVote[hashKey].guesses 
    var weekNumber = fbVote[hashKey].weekNumber
    var lastPlace = _.last(guesses)

    //$log.log(lastPlace)
    // get week loser ARRAY
    // loop through array

    _.forEach(weekLoser, function(loser, index, collection){
      
      if (loser.name == lastPlace.name){
        $log.log('trigger', playerId)
        new Promise(function(resolve, reject){
          resolve(Users.getUserByTwitter(playerId))
          }).then(function(userId){
            new Promise(function(resolve, reject){
              resolve(service.checkIfScoreBlockExists(userId,pointBlock))
              }).then(function(result){
              if (_.isNil(result)){
                ref.child('players/' + userId + '/points').push(pointBlock)
              } else {
                $log.log("already scored!")
              }
            })
        })

      } 
    })
    // see if week loser matches lastPlace


    



  },

  service.checkIfScoreBlockExists = function(userId,pointBlock){
    //$log.log('called')

    return ref.child('players/' + userId + '/points').once('value').then(function(snapshot){
      var j = snapshot.val()

      var result;
      _.forEach(j, function(value, index, collection){
        $log.log(value.type, pointBlock.type, value.week, pointBlock.week)
        if(value.type == pointBlock.type && value.week == pointBlock.week){
          $log.log('RESULT IS TRUE')
           result = 'true'
        } else {
          $log.log('RESULT IS FALSE')
          result = 'false'
        }
      })
      //$log.log('result', result)
      return result
    })


  }


});
