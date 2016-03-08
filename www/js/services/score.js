'use strict';
angular.module('App').service('Score', function(FURL, $firebaseArray, $firebase, $log, $firebaseObject, $firebaseAuth) {

  var service = this;
  var ref = new Firebase(FURL);
  //get score ref

  // service.getArrayOfUsers = function(data){
  //   var newArray = [];
  //    _.forEach(data, function(o){
  //     newArray.push({id: o.$id, voteRef:})
      
  //   })
  //    return newArray;
  // }

});
