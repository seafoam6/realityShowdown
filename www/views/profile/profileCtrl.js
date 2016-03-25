'Use Strict';
angular.module('App').controller('profileCtrl', function ($scope, $state, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, $firebaseAuth, Users, $log) {

  vm = this;
  


  // Load player info
  new Promise(function(resolve, reject){
    resolve(Users.getUserObjByTwitter($state.params.id))
  }).then(function(result){
    $log.log(result)
    $scope.$apply(function(){ 
      vm.player = result;
    })
    
  })
  
  // load the score
  

});
