'Use Strict';
angular.module('App').controller('pointsController', function ($cordovaOauth, $firebaseArray, $firebaseAuth,$firebaseObject,  $http,  $ionicPopup, $localStorage, $location, $log, $scope, $state, Auth, FURL, Player, Show, Utils, Vote, Score, Weeks) {


  var votesRef;
  var weeks;
  var weeksRef = new Firebase(FURL + 'weeks');
  $scope.weeks = weeks =  $firebaseArray(weeksRef)

  $scope.loadWeek = function(week){
    $scope.activeWeek = week
    participationPoints.week = week.weekNumber
    $log.log(participationPoints)
    getVotesRef(week.weekNumber)
  }

  function getVotesRef(weekNumber){
    votesRef = new Firebase(FURL + "votes/RuPaul's%20Drag%20Race/season8/" + weekNumber).then(function(e){$log.log(e)})

  }
  
  

  var players;
  var playersRef = new Firebase(FURL + 'players')
  $scope.players = players = $firebaseObject(playersRef)

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
    

  }

 })