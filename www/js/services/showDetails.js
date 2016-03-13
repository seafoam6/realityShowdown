'use strict';
angular.module('App').factory('Show', function(FURL, $firebaseArray, $firebaseObject) {

  var Show = $firebaseObject
    return function() {
      var ref = new Firebase(FURL).child('showDetails');
      return Show(ref);
    }

});
