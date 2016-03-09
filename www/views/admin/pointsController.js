'Use Strict';
angular.module('App').controller('pointsController', function ($cordovaOauth, $firebaseArray, $firebaseAuth,$firebaseObject,  $http,  $ionicPopup, $localStorage, $location, $log, $scope, $state, Auth, FURL, Player, Show, Utils, Vote, Score, Weeks) {
 
  var weeksRef = new Firebase(FURL + 'weeks');
  $scope.weeks = $firebaseArray(weeksRef)

  $scope.loadWeek = function(week){
    $scope.activeWeek = week
  }

  var votesRef = new Firebase(FURL + "votes/RuPaul's%20Drag%20Race/season8/week1")
  $scope.votes = $firebaseArray(votesRef)

  var playersRef = new Firebase(FURL + 'players')
  $scope.players = $firebaseObject(playersRef)

  var getPlayers = function(){
    var names = [];
    _.forEach($scope.votes, function(o){
      //$log.log(o.$id)
      names.push(o.$id)
    })
    return names;
  }

  var participationPoints = {
    points:10,
    type:'participation',
    playerId:'',
    week:''
  }

  function givePlayerScore(player){
    voterNames[0].score.push(participationPoints)
  }

  $scope.scoreParticipation = function(){
    var voterNames = getPlayers()
    //$log.log('last', voterNames[0])

    //get array of player keys from twitter names
    var playerIds = Object.keys($scope.players);

    _.forEach(voterNames, function(voterName, key, collection){
      //$log.log('value', value)
      
      _.forEach($scope.players, function(value2, key2, collection2){
          //$log.log('val2', value2)
          if(value2 !== null){
            //$log.log('id', value2.id)
            if (voterName == value2.id ){
              $log.log(voterName, value2.id)
              value2.score
            }
          }
      })
     
      //make points block
      //attach points block
    })
  }

 })