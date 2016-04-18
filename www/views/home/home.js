'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, $firebaseAuth, Player, $log, Users, $firebaseArray) {

  $scope.user = Player.getPlayer()

var playersArray = $firebaseArray(new Firebase(FURL + 'players'))
  var playersObject = $firebaseObject(new Firebase(FURL + 'players'))

  var ref = new Firebase(FURL);
  $scope.authObj = $firebaseAuth(ref);

 
playersArray.$loaded().then(function(data){
    //$log.log('players array data', data)
    
    //find match for username 
    var match = _.find(data, function(o) { return o.id == $scope.user.id })

    $scope.player = match;

  })



 $scope.fixImage = function(){
  fbId = "-KC8EegSKh7h1_Iczkn7"
  $log.log($localStorage.user)
  var playerInfo = {
    avatar:$localStorage.user.avatar,
    name:$localStorage.user.name,
    lastLogin: Date(),
    twitterName:$localStorage.user.twitterName
  }
  //$log.log(PlayerInfo)
  Users.updatePlayerInfo(fbId,playerInfo)
 }



  
$scope.authTest = function(){
  ref.child('test').update({"thing":"ki3"})
}
  


});
