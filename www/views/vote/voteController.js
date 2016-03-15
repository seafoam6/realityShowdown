'Use Strict';
angular.module('App').controller('voteController', function ($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils, Player, $log, $filter,  Show, Vote) {

  $scope.pickedQueens = [];
  $scope.playerId = Player.getPlayerId();
  //this is for show info
  var show = new Show;
  var allQueens, allWeeks, activeQueens, activeWeeks, selectableQueens, vote = {season:'',showName:'',playerId:'',weekNumber:'',guesses:''}, currentWeek, pristineContestants, voteDetails = {};

  

  var contestantRef = new Firebase(FURL).child('queens');
  
  var contestants = $firebaseArray(contestantRef)

  var weeks = $firebaseArray(new Firebase(FURL).child('weeks'));

  function setOpenVoting(currentWeek){
    if (currentWeek){
      $scope.openVoting = 'open'
    } else {
      $scope.openVoting = 'notOpen';
    }
    Utils.hide();
  }

  Utils.show();

  function loadPrevVote(data){
    if (typeof data === 'undefined'){
        //$scope.pickedQueens = data.guesses;
        $scope.prevVote = 'noVote'
      } else {
        $log.log('previous vote', data)
        $scope.prevVote = 'vote'
        $scope.pickedQueens = data.guesses;
      }
  }

  function getPreviousVote(){

    new Promise(function(resolve, reject){
      resolve(Vote.retrieveVote(makeVoteDetails()))
    })
    .then(function(data){
      //$log.log(data)
      loadPrevVote(data)
      return data    
    });
  }

weeks.$loaded()
  .then(function(data){
    currentWeek = _.find(data, { 'isActive': true })
    $log.log('cur', currentWeek)
    $scope.week = currentWeek
    setOpenVoting(currentWeek);
    getPreviousVote()
    return data;
  })
  .then(function(data){

    var loserNames = Utils.calcLoserQueens(data)

    $scope.contestants = Utils.removeLoserQueens(loserNames,contestants); 

  })
  .catch(function(error) {
    console.log("Error:", error);
  });

 
      
  function makeVoteDetails(){
      voteDetails.season = show.season;
      voteDetails.showName = show.name;
      voteDetails.playerId = $scope.playerId;
      voteDetails.weekNumber = currentWeek.weekNumber;
      return voteDetails;
  }

// Selected queens from buttons
  $scope.pickQueen = function(queen, index){
    //$log.log(queen, index)
    $scope.contestants.splice(index,1)
    $scope.pickedQueens.push(queen)
  }
  
  


// clears current selection on vote
  $scope.clear = function(){
    $scope.pickedQueens = [];
    $scope.prevVote = 'noVote'

    $scope.contestants = $firebaseArray(contestantRef)
    //$log.log($scope.openVoting, $scope.prevVote, $scope.contestants)
  }

$scope.deletePrevVote = function(){
  //delete previous entry
  Vote.deleteVote(makeVoteDetails());
  $scope.contestants = $firebaseArray(contestantRef)
  $scope.prevVote = 'noVote'
  $scope.pickedQueens = [];
}

//makes sure every choice is picked
  function voteCompleted(){
     if ($scope.contestants.length == 0){
      return true
     } else{
      return false;
     }
  }

  $scope.castVote = function(){
    if (voteCompleted()){
      vote.season = show.season;
      vote.showName = show.name;
      vote.playerId = $scope.playerId;
      vote.weekNumber = currentWeek.weekNumber;
      vote.guesses = Utils.fbArrayToPoa($scope.pickedQueens);
      $log.log('guesses',vote.guesses)
      //$log.log($scope.pickedQueens)
      Vote.submitVote(vote)
      $scope.prevVote = 'vote'
    } else {
      $log.log('vote not completed')
      //make error scenarios
    }

  }
  
 // write way to reverse selection order

$scope.thing = function(){
  $log.log('you pushed thing button')
}



});
