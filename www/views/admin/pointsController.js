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
  $scope.players = $firebaseArray(playersRef)

  var getPlayers = function(){
    var names = [];
    _.forEach($scope.votes, function(o){
      $log.log(o.$id)
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
    players[0].score.push(participationPoints)
  }

  $scope.scoreParticipation = function(){
    var players = getPlayers()
    $log.log('last', players)

    //get array of player keys from twitter names

    _.forEach(players, function(){
      $log.log('fk')
      //make points block
      //attach points block
    })
  }

 })