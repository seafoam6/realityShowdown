'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, $firebaseAuth, Player, $log) {



  var ref = new Firebase(FURL);
  $scope.authObj = $firebaseAuth(ref);

  $scope.logOut = function () {
      //Auth.logout();
      $location.path("/login");
  }

  $scope.getAuth = function(){
    new Promise(function(resolve, reject){
      resolve(Player.uid())
    })
    .then(function(data){
      $log.log(data)
      $scope.id = data
      return data    
    });
  }

  new Promise(function(resolve, reject){
      resolve(Player.uid())
    })
    .then(function(data){
      //$log.log(data)
      $scope.id = data
      return data    
    });

  

  


});
