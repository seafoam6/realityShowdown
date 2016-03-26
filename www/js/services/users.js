'use strict';
angular.module('App').service('Users', function(FURL, $firebaseArray,$log, $localStorage, $firebaseObject, $firebaseAuth) {
  
  var service = this;
  var ref = new Firebase(FURL+'players');


  service.updatePlayerInfo = function(fbId, playerInfo){
    ref.child(fbId).update(playerInfo)
    $log.log('udated player info')
  }
  
  service.getAllUsers = function(){
    return ref.once('value').then(function(snapshot) {
      return snapshot.val();
    })
  }

  service.getUserObjByTwitter = function(twitterId){
    return ref.once('value').then(function(snapshot) {
      var j = snapshot.val();
      var result;
      _.forEach(j, function(value, index, collection){
        if(value.id == twitterId){
          result = value;
        }
      })
      return result
    });
  }

  service.getUserByTwitter = function(twitterId){
    return ref.once('value').then(function(snapshot) {
      var j = snapshot.val();
      /////
      ////
      ///
      //magic key finder!
      /*           */
      var result;
      _.forEach(j, function(value, index, collection){
        //$log.log('in userbytwitter', value.name, index);
        //$log.log(queenName)
        //$log.log(value, twitterId)
        if(value.id == twitterId){
          result = index;
        }
      })
      //$log.log('pre', result)
      return result
    });
  }

    

});
