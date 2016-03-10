'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, $firebaseAuth, Player, $log, Users, $firebaseArray) {

  $scope.user = Player.getPlayer()

var playersArray = $firebaseArray(new Firebase(FURL + 'players'))
  var playersObject = $firebaseObject(new Firebase(FURL + 'players'))

  var ref = new Firebase(FURL);
  $scope.authObj = $firebaseAuth(ref);

  $scope.logOut = function () {
      delete $localStorage.user;
      $location.path("/login");
  }

 
 playersArray.$loaded().then(function(data){
        //$log.log('players array data', data)
        
        //find match for username 
        var match = _.find(data, function(o) { return o.id == $scope.user.id })

        $scope.player = match;

      })



 

  

  


});
