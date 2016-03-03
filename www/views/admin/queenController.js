'Use Strict';
angular.module('App').controller('queenController', function ($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils, $log) {

  var ref = new Firebase(FURL + 'queens');

  $scope.showNew,
  $scope.showEdit = false;
  $scope.action = 'none'
  $scope.queens = $firebaseArray(ref)
  $scope.showForm = false;

  $scope.newQueen = {}
  $scope.steve = 'stevee';

  function clearForm(){
    $scope.queen = {
      name:'',
      birthName:'',
      age:'',
      hometown:'',
      twitter:''
    }
  }

  function hideForm(){
    $scope.showForm = false;
  }

  $scope.cancelNewQueen = function(){
    clearForm()
    hideForm()
  }

  
  $scope.loadQ = function(q){
    $log.log(q)
    $scope.queen = q;
    $scope.action = 'edit'
    $scope.showForm = true;
  }
  $scope.createNewQueen = function(){
    $log.log('making new queen');
    clearForm()
    $scope.showForm = true;
    $scope.action = 'new'
  }
  

  $scope.saveQueen = function(queen){
    $log.log('edited', queen)
    $scope.queen = queen;
    $scope.queens.$save(queen); 
    hideForm()
  }
  $scope.saveNewQueen = function(queen){
    $log.log('saving', queen)
    $scope.queens.$add(queen)
    $scope.queen = '';
    action = 'edit'
    $scope.showForm = false;
  }
  $scope.deleteQueen = function(queen){
    $scope.queens.$remove(queen)
    Utils.alertshow("Delete", queen.name + "was deleted.");
    clearForm()
    hideForm()
  }

});
