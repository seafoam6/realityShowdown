'use strict';
angular.module('App').factory('Vote', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth) {

  var ref = new Firebase(FURL);



  var Vote = {
    submitVote : function(vote){
    $log.log('vote about to be submitted', vote)
    var voteSpot = new Firebase(FURL).child('votes/' +
      vote.showName + 
      '/season' + 
      vote.season +
      '/week' + 
      vote.weekNumber + 
      '/' +
      vote.playerId)
    voteSpot.set(vote)
    //voteSpot.$add(vote)
    },

    retrieveVote : function(voteDetails){
      //$log.log('retrieve vote details', voteDetails)
      var voteSpot = new Firebase(FURL).child('votes/' +
      voteDetails.showName + 
      '/season' + 
      voteDetails.season +
      '/week' + 
      voteDetails.weekNumber + 
      '/' + 
      voteDetails.playerId)
      
      return voteSpot.once('value').then(function(snapshot){

        return snapshot.val();
      })
    },

    retrieveAllVotes : function(voteDetails){
      //$log.log(voteDetails)
      var voteSpot = new Firebase(FURL).child('votes' + '/' +
      voteDetails.showName + 
      '/season' + 
      voteDetails.season +
      '/week' + 
      voteDetails.weekNumber + '/')

      return $firebaseArray(voteSpot).$loaded().then(function(data){
        $log.log('vs',voteSpot)
        $log.log('in votespot', data[0])
        return data
      })
    },

    deleteVote : function(voteDetails){
      //$log.log(voteDetails)
      var voteSpot = new Firebase(FURL).child('votes' + '/' +
      voteDetails.showName + 
      '/season' + 
      voteDetails.season +
      '/week' + 
      voteDetails.weekNumber + 
      '/' +
      voteDetails.playerId)

      voteSpot.set(null);

      // return $firebaseArray(voteSpot).$loaded().then(function(data){
      //   // 0 passes in first child of object
      //   var j = data[0].$id
      //   $firebaseArray(voteSpot).$remove(j)
      // })
    }

  }

  return Vote;

});
