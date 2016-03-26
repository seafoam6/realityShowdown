'use strict';
angular.module('App').service('Score', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth, Users) {

  var service = this;
  var ref = new Firebase(FURL);

  function scoreThePoints(playerId,pointBlock){
    //$log.log(playerId, pointBlock)
    new Promise(function(resolve, reject){
      resolve(Users.getUserByTwitter(playerId))
      }).then(function(userId){
        //$log.log('user id ', userId)
        new Promise(function(resolve, reject){

          //CHECK IF SCORE BLOCK EXISTS
          resolve(service.checkIfScoreBlockExists(userId,pointBlock))
          }).then(function(result){
            $log.log('matches', result)

            //if not true that it exists
          if (!result){
            ref.child('players/' + userId + '/points').push(pointBlock)
          } 
        })
    })
  }

  service.calculatePlayerScores = function(){
    new Promise(function(resolve,reject){
      resolve(Users.getAllUsers())
    }).then(function(allUsers){
        _.forEach(allUsers, function(value, index, collection){
        let tempTotalPoints;
        //see if pointsArray value exists
        if (_.has(value, 'points')){
          //tempTotalPoints = _.sumBy(value,'points')
          var setOfPoints = value.points
          var tempSum = 0;
          _.forEach(setOfPoints, function(pointBlock, i2, c2){
            tempSum += pointBlock.points
            
          })
          $log.log(tempSum, index)

          //SAVE PLAYER SCORE!!!!


          ref.child('players/' + index).update({totalPoints:tempSum})
        }
        
      })
    })

  }

  service.giveParticipationPoints = function(vote, playerId, pointBlock){

    scoreThePoints(playerId,pointBlock)
  }

  service.giveBullseyePoints = function(fbVote, playerId, pointBlock, weekLoser){

    var hashKey = Object.keys(fbVote)
    //var vote = fbVote[hashKey]
    var guesses = fbVote.guesses 
    var weekNumber = fbVote.weekNumber
    var lastPlace = _.last(guesses)
    $log.log(fbVote)
    _.forEach(weekLoser, function(loser, index, collection){
      //$log.log(loser.name, lastPlace.name)
      if (loser.name == lastPlace.name){

        scoreThePoints(playerId,pointBlock)

      } 
    })

  }

  service.giveEchoPoints = function(fbVote, playerId, pointBlock, fbWeeks){

    //$log.log('fbvote',fbVote)
    var hashKey = Object.keys(fbVote)

    //vote for the week we're echoing
    //var vote = fbVote[hashKey]

    //guesses to iterate through
    var guesses = fbVote.guesses 
    var weekNumber = fbVote.weekNumber
    var lastPlace = _.last(guesses)


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
      $log.log(pointBlock.type)
      if (pointBlock.type == 'echo'){
        $log.log('echo')
        result = _.find(j, function(value, index, collection){
          return value.type == pointBlock.type && 
            value.week == pointBlock.week &&
            value.echoWeek == pointBlock.echoWeek
        })

      } else {
        result = _.find(j, function(value, index, collection){
          return value.type == pointBlock.type && value.week == pointBlock.week
        })
      }
      
      return result
    })
  }


});
