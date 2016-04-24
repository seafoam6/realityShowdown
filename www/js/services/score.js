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
           // $log.log('matches', result)

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
          //$log.log(tempSum, index)

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
    //$log.log(fbVote)
    _.forEach(weekLoser, function(loser, index, collection){
      //$log.log(loser.name, lastPlace.name)
      if (loser.name == lastPlace.name){

        scoreThePoints(playerId,pointBlock)

      } 
    })

  }

  service.giveEchoPoints = function(fbVote, playerId, pointBlock, fbWeeks){


   var totalPlaces = 12;
   var weekBeingScored = fbVote.weekNumber;

   //filter out weeks without a loser
   var allLosers = _.filter(fbWeeks, function(o){return o.loser; })

   //filter out current and previous weeks
   allLosers = _.filter(allLosers, function(o) {return o.weekNumber > weekBeingScored})

   //set place for all losers;
   // place is (12 - weekNumber + 1)
   _.forEach(allLosers, function(o){ o.place = totalPlaces - o.weekNumber + 1})

   // all losers is a slot title that may have multiple

   _.forEach(fbVote.guesses, function(guess, guessIndex, guessCollection){
    // console.log('position ' + (index + 1), key.name )
    // debugger;
      _.forEach(allLosers, function(loser, loserIndex, loserCollection){

        _.forEach(loser.loser, function(currentLoser, currentLoserIndex, currentLoserCollection){
          if ((currentLoser.name == guess.name)
            && (loser.place == guessIndex + 1)){
            console.log(loser.place, currentLoser.name, loser.weekNumber, playerId)
            //pointBlock.predicts = currentLoser.name;
            //pointBlock.echoWeek = loser.weekNumber;
            console.log(fbVote)
           
            var pointBlock = {
              predicts: currentLoser.name,
              type: "echo",
              week: fbVote.weekNumber,
              points:20,
              echoWeek:loser.weekNumber
            };
            console.log(pointBlock)
            scoreThePoints(playerId, pointBlock);
          }
          
        })

      })
   })


   

  }

  service.checkIfScoreBlockExists = function(userId,pointBlock){
    //$log.log('called')

    return ref.child('players/' + userId + '/points').once('value').then(function(snapshot){
      var j = snapshot.val()
      var result;
      //$log.log(pointBlock.type)
      if (pointBlock.type == 'echo'){
        //$log.log('echo')
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
