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

    getWeeksVote : function(showDetails, weekNumber){
      //$log.log('retrieve vote details', showDetails, weekNumber)
      var voteSpot = new Firebase(FURL).child('votes/' +
      showDetails.name + 
      '/season' + 
      showDetails.season +
      '/week' + 
      weekNumber)


      return voteSpot.once('value').then(function(snapshot){
        return snapshot.val();
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
      $log.log('votes' + '/' +
      voteDetails.showName + 
      '/season' + 
      voteDetails.season +
      '/week' + 
      voteDetails.weekNumber + 
      '/' +
      voteDetails.playerId)
      voteSpot.set(null);
    }

  }

  return Vote;

});
