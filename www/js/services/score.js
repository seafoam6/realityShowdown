'use strict';
angular.module('App').service('Score', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth, Users) {

  var service = this;
  var ref = new Firebase(FURL);

  function scoreThePoints(playerId,pointBlock){
    new Promise(function(resolve, reject){
      resolve(Users.getUserByTwitter(playerId))
      }).then(function(userId){
        new Promise(function(resolve, reject){

          //CHECK IF SCORE BLOCK EXISTS
          resolve(service.checkIfScoreBlockExists(userId,pointBlock))
          }).then(function(result){
          if (_.isNil(result)){
            ref.child('players/' + userId + '/points').push(pointBlock)
          } 
        })
    })
  }

  service.giveParticipationPoints = function(vote, playerId, pointBlock){

    scoreThePoints(playerId,pointBlock)
  }

  service.giveBullseyePoints = function(fbVote, playerId, pointBlock, weekLoser){

    var hashKey = Object.keys(fbVote)
    var vote = fbVote[hashKey]
    var guesses = fbVote[hashKey].guesses 
    var weekNumber = fbVote[hashKey].weekNumber
    var lastPlace = _.last(guesses)

    _.forEach(weekLoser, function(loser, index, collection){
      
      if (loser.name == lastPlace.name){

        scoreThePoints(playerId,pointBlock)

      } 
    })

  }

  service.giveEchoPoints = function(fbVote, playerId, pointBlock, fbWeeks){

    //$log.log('fbvote',fbVote)
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
        //remove THIS WEEK'S LOSER

        // for each week.loser
        _.forEach(week.loser, function(loser, index, collection){
          var guessHolder = guesses[guesses.length - week.weekNumber]
          var guessName = guessHolder.name

          if (
            weekNumber < week.weekNumber && 
            loser.name == guessName
            ){
              $log.log('loser ' + loser.name, ' for week number ' + week.weekNumber, '. guess ' + guessName + ' currentWeek is ' + weekNumber)
            scoreThePoints(playerId,pointBlock)
          }
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

        //echo has more testing conditions
        if (pointBlock.type != 'echo'){
          if(value.type == pointBlock.type && value.week == pointBlock.week){
             result = true
          } else {
            result = false
          }
        } else {
          //pointBlock echo
          if(
            value.type == pointBlock.type && 
            value.week == pointBlock.week &&
            value.echoWeek == pointBlock.echoWeek
            ){
             result = true
          } else {
            result = false
          }
        }
      })
      return result
    })
  }


});
