'Use Strict';
angular.module('App').controller('profileCtrl', function ($scope, $state, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, $firebaseAuth, Users, $log) {

  vm = this;
  


  // Load player info
  new Promise(function(resolve, reject){
    resolve(Users.getUserObjByTwitter($state.params.id))
  }).then(function(result){
    $scope.$apply(function(){
      $log.log(result)
      vm.player = result;
    })
    
  })
  
  // load the score
  

});
