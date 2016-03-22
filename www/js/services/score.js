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
          }
        })

    })
  }

  service.giveBullseyePoints = function(fbVote, playerId, pointBlock, weekLoser){


    var hashKey = Object.keys(fbVote)
    var vote = fbVote[hashKey]
    var guesses = fbVote[hashKey].guesses 
    var weekNumber = fbVote[hashKey].weekNumber
    var lastPlace = _.last(guesses)

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

  }

  service.giveEchoPoints = function(fbVote, playerId, pointBlock, fbWeeks){

    $log.log('fbvote',fbVote)
    var hashKey = Object.keys(fbVote)

    //vote for the week we're echoing
    var vote = fbVote[hashKey]

    //guesses to iterate through
    var guesses = fbVote[hashKey].guesses 
    var weekNumber = fbVote[hashKey].weekNumber
    var lastPlace = _.last(guesses)

    //$log.log(lastPlace)
    // get week loser ARRAY
    // loop through array

    _.forEach(fbWeeks, function(week, index, collection){

      //make sure week loser isn't empty
      if (!_.isEmpty(week.loser)){
        //$log.log(week.loser)
      }
      
      // this is the check to see if points should be awarded
      if (false){
        

        // this pulls up user and awards points if they
        // don't already have them
        new Promise(function(resolve, reject){
          resolve(Users.getUserByTwitter(playerId))
          }).then(function(userId){
            new Promise(function(resolve, reject){
              resolve(service.checkIfScoreBlockExists(userId,pointBlock))
              }).then(function(result){
              if (_.isNil(result)){
                ref.child('players/' + userId + '/points').push(pointBlock)
              } 
            })
        })

      } 
    })
    // see if week loser matches lastPlace

  }

  service.checkIfScoreBlockExists = function(userId,pointBlock){
    //$log.log('called')

    return ref.child('players/' + userId + '/points').once('value').then(function(snapshot){
      var j = snapshot.val()

      var result;
      _.forEach(j, function(value, index, collection){
        $log.log(value.type, pointBlock.type, value.week, pointBlock.week)
        if(value.type == pointBlock.type && value.week == pointBlock.week){
          $log.log('RESULT IS TRUE')
           result = true
        } else {
          $log.log('RESULT IS FALSE')
          result = false
        }
      })
      return result
    })
  }


});
