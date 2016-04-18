'Use Strict';
angular.module('App').controller('voteController', function ($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils, Player, $log, $filter,  Show, Vote, Queens, Weeks, Score) {

  $scope.pickedQueens = [];
  $scope.playerId = Player.getPlayerId();
  //this is for show info
  
  var allQueens, show, allWeeks, activeQueens, activeWeeks, selectableQueens, vote = {season:'',showName:'',playerId:'',weekNumber:'',guesses:''}, currentWeek, pristineContestants, voteDetails = {};


// active contestants
function getActiveContestants(){
  new Promise(function(resolve, reject){
    resolve(Queens.getActiveQueens())
  }).then(function(result){
    $log.log('geateer', result)
    $scope.$apply(function(){
      $scope.contestants = result
    })
    return result
  }).then(function(result){
    pristineContestants = result
  }).catch(function(err){
    $log.error(err)
  })
}

getActiveContestants()



// WEEKS // WEEKS // WEEKS
  new Promise(function(resolve, reject){
    resolve(Weeks.getActiveWeeks())
  }).then(function(result){
    if (result){
      $log.log(result.weekNumber)
      $scope.currentWeek = result.weekNumber
    } else{
      $log.log('no match')
      $scope.currentWeek = false
    }
    return result
  }).then(function(currentWeek){
    setOpenVoting(currentWeek)
    return
  }).then(function(){
    makeVoteDetails()
    return
  }).catch(function(err){
    $log.error(err)
  })

  

  var contestantRef = new Firebase(FURL).child('queens');
  
  var contestants = $firebaseArray(contestantRef)

  

  function setOpenVoting(currentWeek){
    $log.log('current weeek', currentWeek)
    if (currentWeek){
      $scope.openVoting = 'open'
    } else {
      $scope.openVoting = 'notOpen';
    }
    Utils.hide();
  }

 Utils.show();

  function loadPrevVote(data){
    $log.log('load prev vote', data)
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
    $log.log('get Previous Vote', voteDetails)
    new Promise(function(resolve, reject){
      resolve(Vote.retrieveVote(voteDetails))
    })
    .then(function(data){
      //test to see if previous vote exists
      if (_.isNil(data)){
        $log.log('no previous data')
        $scope.prevVote = 'noVote'
      } else {
        loadPrevVote(data)
      }
      
      return data    
    });
  }



 
      
  function makeVoteDetails(){
    return new Promise(function(resolve, reject){
      resolve(Show.getShowDetails())
    }).then(function(show){
      $scope.show = show

      voteDetails.season = show.season;
      voteDetails.showName = show.name;
      voteDetails.playerId = $scope.playerId;
      voteDetails.weekNumber = $scope.currentWeek;
      return voteDetails;
    }).then(function(){
    getPreviousVote()
    return
  })
     
  }

// Selected queens from buttons
  $scope.pickQueen = function(queen, index){
    //$log.log(queen, index)
    $scope.contestants.splice(index,1)
    $scope.pickedQueens.push(queen)
  }
  
  


// clears current selection on vote
  $scope.clear = function(){
    $scope.pickedQueens= []
    $scope.prevVote = 'noVote'
    $scope.contestants = pristineContestants
    //$log.log('bump', pristineContestants, $scope.contestants)

    getActiveContestants()
    //$log.log($scope.openVoting, $scope.prevVote, $scope.contestants)
  }

$scope.deletePrevVote = function(){

  //delete previous entry
  Vote.deleteVote(voteDetails);

  getActiveContestants()
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

      vote.season = $scope.show.season;
      vote.showName = $scope.show.name;
      vote.playerId = $scope.playerId;
      vote.weekNumber = $scope.currentWeek;
      vote.guesses = Utils.fbArrayToPoa($scope.pickedQueens);
      $log.log('guesses',vote.guesses)
      //$log.log($scope.pickedQueens)
      Vote.submitVote(vote)
      // add points 

/**/

      //Score.giveParticipationPoints('',)
      //calculate scores

      $scope.prevVote = 'vote'
    } else {
      $log.log('vote not completed')
      //make error scenarios
    }

  }
  



});
