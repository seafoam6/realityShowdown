'Use Strict';
angular.module('App').controller('pointsController', function ($cordovaOauth, $firebaseArray, $firebaseAuth,$firebaseObject,  $http,  $ionicPopup, $localStorage, $location, $log, $scope, $state, Auth, FURL, Player, Show, Utils, Vote, Score, Weeks) {
  vm = this;
  vm.weeks = Weeks.getWeeks();
  vm.show = new Show;
  var votesRef;

  vm.loadWeek = function(week){
    vm.activeWeek = week;
  }

  var currentPlayers = $firebaseArray(new Firebase(FURL + 'players'))
  
  var participationPoints = {
    type:'participation',
    points:10,
    week:1
  }

  var makeVotesRef = function(){
    return new Firebase(FURL).child('votes/' +
      vm.show.name + 
      '/season' + 
      vm.show.season +
      '/week' + 
      vm.activeWeek.weekNumber + '/')
  }


  vm.getAllVotesFromActiveWeek = function(){
    votesRef = makeVotesRef();
    //$log.log('vf', votesRef)
    vm.weekVotes = $firebaseArray(votesRef)
  }

  vm.showVoteDetails = function(vote){
    $log.log('vote', vote)
    //works after delay
    var singleVote = $firebaseArray(votesRef.child(vote.$id));
    vm.specific = singleVote
    $log.log(singleVote)


  }


  vm.scoreParticipation = function(vote){
    $log.log('vote', vote)

    $firebaseArray(new Firebase(FURL + 'players'))

    $log.log('current player', currentPlayers)
    var match = _.find(currentPlayers, function(o) { 
      return o.id == vote.$id 
    })
        $log.log('match',match)
         match.score = []
         match.score.push(participationPoints)
         currentPlayers.$save(match)
  }

  vm.test = function(){
    $log.log(vm.weekVotes)
  }
  

 })