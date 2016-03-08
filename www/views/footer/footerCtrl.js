'Use Strict';
angular.module('App').controller('footerCtrl', function ($scope, $state, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, $firebaseAuth, Player, $log) {
  var ref = new Firebase(FURL);
  var auth = $firebaseAuth(ref);
  $scope.isAdmin = Player.isAdmin();

  $scope.logout = function(){
      delete $localStorage.user;
      $location.path("/login");
  }

});
