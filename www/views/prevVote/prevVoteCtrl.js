'Use Strict';
angular.module('App').controller('prevVoteCtrl', function ($scope, $state, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, $firebaseAuth, Users, $log, Show, Vote) {

  vm = this;
 
 vm.state = $state.params
  var showDetails;

  new Promise(function(resolve, reject){
    resolve(Show.getShowDetails())
  }).then(function(result){
    $log.log('show details ', result)
    showDetails = result;
    voteDetails = {
      showName:showDetails.name,
      season:showDetails.season,
      weekNumber:$state.params.week,
      playerId:$state.params.id
    }
    return voteDetails
  }).then(function(voteDetails){
    new Promise(function(resolve, reject){
      resolve(Vote.retrieveVote(voteDetails))
    }).then(function(voteObj){
      
      var vote = Object.keys(voteObj)
      $log.log(vote)
      vm.vote = voteObj
    })
  })



});
