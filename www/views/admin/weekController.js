'Use Strict';
angular.module('App').controller('weekController', function ($cordovaOauth, $firebaseArray, $firebaseAuth,$firebaseObject,  $http,  $ionicPopup, $localStorage, $location, $log, $scope, $state, Auth, FURL, Player, Show, Utils, Vote, Score, Queens) {

  var ref = new Firebase(FURL + 'weeks');
  // var queensRef = new Firebase(FURL + 'queens');
  var authRef = new Firebase(FURL);
  $scope.authObj = $firebaseAuth(authRef).$getAuth();
  var pointsRef = new Firebase(FURL + 'points')
  $scope.showNew,
  $scope.showEdit = false;
  $scope.action = 'none'
  
  // $scope.queens = $firebaseArray(queensRef)


  $scope.showForm = false;
  var showRef = new Firebase(FURL).child('showDetails');
  var show = $firebaseObject(showRef);
  $scope.newWeek = {}




  // for testing delete after
  // no more button clicking
  $firebaseArray(ref)
  .$loaded()
  .then(function(data){
    $scope.weeks = data

  })

  new Promise(function(resolve, reject){
    resolve(Queens.getAllQueens())
  }).then(function(result){
    $scope.queens = result
  }).catch(function(err){
    $log.error(err)
  })

  // new Promise(function(resolve, reject){
  //   resolve(Queens.getActiveQueens())
  // }).then(function(result){
  //   $scope.result = result
  // }).catch(function(err){
  //   $log.error(err)
  // })


  function nextWeek(){
    if ($scope.weeks.length){
      return $scope.weeks.length + 1
    } else{
      return 1
    }
    
  }

  function clearForm(){
    $scope.week = {
      weekNumber:nextWeek(),
      isActive:true,
      loser:[],
      scored:false
    }
  }

  function hideForm(){
    $scope.showForm = false;
  }


  $scope.cancelNewWeek = function(){
    clearForm()
    hideForm()
  }

var losers = [];

  $scope.setLoser = function(queen){
    $log.log(queen)


    // if loser is not in array
    losers.push(queen)
    $scope.week.loser = losers
  }

  $scope.clearLosers = function(){
    $scope.week.loser = []
  }

  
  $scope.loadWeek = function(week){
    //$log.log(week)
    $scope.week = week;
    $scope.action = 'edit'
    $scope.showForm = true;
  }
  $scope.createNewWeek = function(){
    //$log.log('making new week');
    clearForm()
    $scope.showForm = true;
    $scope.action = 'new'
  }

  $scope.saveWeek = function(week){
    $log.log('edited', week)
    $scope.week = week;
    $scope.weeks.$save(week); 
    hideForm()
  }
  $scope.saveNewWeek = function(week){
    //$log.log('saving', week)
    $scope.weeks.$add(week)
    $scope.week = '';
    action = 'edit'
    $scope.showForm = false;
  }
  $scope.deleteWeek = function(week){
    var temp = week
    $scope.weeks.$remove(week)
    Utils.alertshow("Delete", temp.name + "was deleted.");
    clearForm()
    hideForm()
  }

});
