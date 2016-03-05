'Use Strict';
angular.module('App').controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, $firebaseArray, FURL, Utils, $log, $firebaseAuth) {
  var ref = new Firebase(FURL);
  var userkey = "";
  var auth = $firebaseAuth(ref);
  var PlayerArray = $firebaseArray(new Firebase(FURL + 'players'))
  var player = {}

  $scope.socLogin = function(socType) {
    
  auth.$authWithOAuthRedirect(socType)
    .then(function(authData){
    }).catch(function(error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        auth.$authWithOAuthPopup(authMethod).then(function(authData) {
        });
      } else {
        console.log(error);
      }
    }); 
  };



  auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData.uid);
    }
    $log.log(authData)

    //get data for 
    player.provider = authData.provider
    player.avatar = authData.twitter.profileImageURL
    player.name = authData.twitter.displayName
    player.twitterName = authData.twitter.username
    player.tempTime = Date()


    var uid = authData.uid
    PlayerArray.$add(player).then(function(ref2){
      $log.log('ref', ref2)
      var id = ref2.key();
      $log.log('index for player array', PlayerArray.$indexFor(id))
    })

  });

  

});
