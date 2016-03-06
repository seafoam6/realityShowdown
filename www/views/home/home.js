'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, $firebaseAuth, Player, $log) {

  $scope.user = $localStorage.user



  var ref = new Firebase(FURL);
  $scope.authObj = $firebaseAuth(ref);

  $scope.logOut = function () {
      delete $localStorage.user;
      $location.path("/login");
  }



 

  

  


});
