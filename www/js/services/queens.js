'use strict';
angular.module('App').service('Queens', function(FURL, $firebaseArray, $log, $firebaseObject, $firebaseAuth) {

  var service = this;
  var ref = new Firebase(FURL).child('queens');
  //get score ref

  service.test = function(){
    $log.log('help')
  }



  //get all queens
  service.getAllQueens = function(){
    return ref.once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  //add queen
    service.addQueen = function(queenToAdd){
    
  }

  //get active queens
  service.getActiveQueens = function(){
    return ref.once('value').then(function(snapshot) {
      var j = snapshot.val();
      j = _.filter(j,['isActive', true])
      return j;
    });
  }

  //get all inactive queens
  service.getInactiveQueens = function(){
    return ref.on('value').then(function(snapshot) {
      var j = snapshot.val();
      j = _.filter(j,['isActive', false])
      return j;
    });
  }

  //set queen active
  service.setQueenActive = function(queenName){
      return ref.orderByChild('name').once('value').then(function(snapshot) {
      var j = snapshot.val();
      /////
      ////
      ///
      //magic key finder!
      /*           */
      var result;
      _.forEach(j, function(o,i,d){
        $log.log(o.name, i);
        //$log.log(queenName)
        if(o.name == queenName){
          result = i;
        }
      })
      ref.child(result).update({
        "isActive":true
      }).then(function(){
        $log.log(queenName + ' is now active ')
      }).catch(function(err){
        $log.error(err)
      })
    });
  }

  //set queen inactive
  service.setQueenInactive = function(queenName){
          return ref.orderByChild('name').once('value').then(function(snapshot) {
      var j = snapshot.val();
      var result;
      _.forEach(j, function(o,i,d){
        if(o.name == queenName){
          result = i;
        }
      })
      ref.child(result).update({
        "isActive":false
      }).then(function(){
        $log.log(queenName + ' is now inactive ')
      }).catch(function(err){
        $log.error(err)
      })
    });
  }



});
