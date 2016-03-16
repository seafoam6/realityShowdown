'Use Strict';
angular.module('App').controller('weekController', function ($cordovaOauth, $firebaseArray, $firebaseAuth,$firebaseObject,  $http,  $ionicPopup, $localStorage, $location, $log, $scope, $state, Auth, FURL, Player, Show, Utils, Vote, Score) {

  var ref = new Firebase(FURL + 'weeks');
  var queensRef = new Firebase(FURL + 'queens');
  var authRef = new Firebase(FURL);
  $scope.authObj = $firebaseAuth(authRef).$getAuth();
  var pointsRef = new Firebase(FURL + 'points')
  $scope.showNew,
  $scope.showEdit = false;
  $scope.action = 'none'
  
  $scope.queens = $firebaseArray(queensRef)
  $scope.showForm = false;
  var showRef = new Firebase(FURL).child('showDetails');
  var show = $firebaseObject(showRef);
  $scope.newWeek = {}


  function getWeeksVotes(week){
     var voteSpot = new Firebase(FURL).child("votes/" + show.name + "/season" + show.season + "/week" + week.weekNumber + "/")
      //$log.log(show.name, show.season, week.weekNumber)
      $firebaseArray(voteSpot).$loaded().then(function(data){
        $scope.votes = data
        return data;
      }).then(function(data){
        //$log.log('votes for this week', data)
        var playersWhoVotedThisWeek = Utils.filterOutHelpers(Object.keys(data))
        
        //single vote ID
        var voteIDMaybe = Object.keys(data[playersWhoVotedThisWeek[0]])
          //$log.log(voteIDMaybe)

      })
    }


// for testing delete after
// no more button clicking
$firebaseArray(ref)
.$loaded()
.then(function(data){
  $scope.weeks = data
  //$scope.weeks = $firebaseArray(ref)
  getWeeksVotes($scope.weeks[0])
})


$scope.score = function(week){
  //$log.log(week)
  //$log.log($scope.weeks[0])
  getWeeksVotes(week)
  
}

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
    losers.push(queen)
    $scope.week.loser = losers
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
