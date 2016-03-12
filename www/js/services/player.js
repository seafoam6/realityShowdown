'use strict';
angular.module('App').service('Player', function(FURL, $firebaseArray,$log, $localStorage, $firebaseObject, $firebaseAuth) {
  var service = this
  var ref = new Firebase(FURL);
  var PlayerArray = $firebaseArray(new Firebase(FURL + 'players'))
  

  



  service.test = function(){
    $log.log('test')
  }

  service.getSinglePlayerRef = function(id){
    return $firebaseArray(new Firebase(FURL + 'players/' + id))
  }

  service.getPlayerId = function(){
    return $localStorage.user.id
  }

  service.getPlayer = function(){
    return $localStorage.user
  }

  service.verifyPlayer = function(){
    // get user id
     if ($localStorage.user.id){
      $log.log('returning')
      return $localStorage.user.id
     } else {
      return false;
     }


     // see if user id matches user id in database
  } 


  service.isAdmin = function(){
    if($localStorage.user.id == 'twitter:17048681'){
      return true;
    } else {
      return false;
    }
  }




});
