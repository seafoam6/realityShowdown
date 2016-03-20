'use strict';
angular.module('App').service('Show', function(FURL, $firebaseArray, $firebaseObject, $log) {

  var service = this;
  var ref = new Firebase(FURL).child('showDetails');

  service.getShowDetails = function(){
    return ref.once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

});