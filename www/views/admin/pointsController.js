'Use Strict';
angular.module('App').controller('pointsController', function ($cordovaOauth, $firebaseArray, $firebaseAuth,$firebaseObject,  $http,  $ionicPopup, $localStorage, $location, $log, $scope, $state, Auth, FURL, Player, Show, Utils, Vote, Score, Weeks) {
  vm = this;

  var participationPoints = {
    type:'participation',
    points:10,
    week:''
  }

  var bullseyePoints = {
    type:'bullseye',
    points:30,
    week:''
  }

  var echoPoints = {
    type:'echo',
    points:20,
    week:'',
    echoWeek:''
  }
  
  //weeks
  new Promise(function(resolve, reject){
      resolve(Weeks.getWeeks())
    }).then(function(result){
      //$log.log(result)
      vm.weeks = result
    }).catch(function(err){
      $log.error(err)
    })


  //show info
  new Promise(function(resolve, reject){
      resolve(Show.getShowDetails())
    }).then(function(show){
      vm.show = show
    }).catch(function(err){
      $log.error(err)
    })
  
  var votesRef;

  vm.loadWeek = function(week){
    vm.activeWeek = week;
    setWeekInPoints(week);
  }

  function setWeekInPoints(week){
    participationPoints.week = week.weekNumber
    bullseyePoints.week = week.weekNumber
    echoPoints.week = week.weekNumber
  }

  vm.scoreParticipation = function(){
    new Promise(function(resolve, reject){
      resolve(Vote.getWeeksVote(vm.show, vm.activeWeek.weekNumber))
    }).then(function(results){
      return results
    }).then(function(results){
      _.forEach(results, function(value, index, collection){
        Score.giveParticipationPoints(value, index, participationPoints)
      })
    }).catch(function(err){
      $log.error(err)
    })
  }

  vm.scoreBullseye = function(){
    new Promise(function(resolve, reject){
      resolve(Vote.getWeeksVote(vm.show, vm.activeWeek.weekNumber))
    }).then(function(results){
      _.forEach(results, function(value, index, collection){
        Score.giveBullseyePoints(value, index, echoPoints, vm.activeWeek.loser)
      })
    }).catch(function(err){
      $log.error(err)
    })
  }

  vm.scoreEcho = function(){
    new Promise(function(resolve, reject){
      resolve(Vote.getWeeksVote(vm.show, vm.activeWeek.weekNumber))
    }).then(function(playerVote){
      _.forEach(playerVote, function(value, index, collection){

        //$log.log('be', vm.weeks)

        Score.giveEchoPoints(value, index, echoPoints, vm.weeks)

      })
    }).catch(function(err){
      $log.error(err)
    })
  }

  vm.calculateScores = function(){
    Score.calculatePlayerScores();
  }
  

 })