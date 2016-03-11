'Use Strict';
angular.module('App').controller('scoreBoardController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils, $firebaseAuth, Player, $log, Users) {

 var playerRef = new Firebase(FURL + 'players');
 $scope.players = $firebaseArray(playerRef)
  


});
