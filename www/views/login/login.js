'Use Strict';
angular.module('App').controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, $firebaseArray, FURL, Player, Utils, $log, $firebaseAuth) {
  var ref = new Firebase(FURL);
  var userkey = "";
  var auth = $firebaseAuth(ref);
  var playersArray = $firebaseArray(new Firebase(FURL + 'players'))
  var playersObject = $firebaseObject(new Firebase(FURL + 'players'))
  var player = {}
  var specific = $firebaseObject(new Firebase(FURL + 'players/-KC7sXP0cPdDrJUkeBF4'))



  $scope.socLogin = function(socType) {
    
    auth.$authWithOAuthRedirect(socType)
      .then(function(authData){
        $localStorage.user = authData
      }).catch(function(error) {
        if (error.code === 'TRANSPORT_UNAVAILABLE') {
          auth.$authWithOAuthPopup(authMethod).then(function(authData) {
          });
        } else {
          console.log(error);
        }
    }); 
  };

 if ($localStorage.user){
    $state.go('home')
  } else {
    waitforAuth()
  }

function waitforAuth(){
  auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData.uid);
    
    //$log.log(authData)

    //get data for 
    player.provider = authData.provider
    player.avatar = authData.twitter.profileImageURL
    player.name = authData.twitter.displayName
    player.twitterName = authData.twitter.username
    player.tempTime = Date()
    player.id = authData.uid

    // if player does not exist
      playersArray.$loaded().then(function(data){
        //$log.log('players array data', data)
        
        
        //find match for username 
        var match = _.find(data, function(o) { return o.id == player.id })

        if (!match){
          playersArray.$add(player)
          $localStorage.user = player
        } else {
          $log.log('player exists')
          $localStorage.user = player
        }

        $state.go('home')

      })

    }
  });
}
  

});
