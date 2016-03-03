'use strict';
angular.module('App').factory('Show', function(FURL, $firebaseArray, $firebaseObject) {

  var Show = $firebaseObject
    return function() {
      var ref = new Firebase(FURL).child('showDetails');
      // create an instance of User (the new operator is required)
      return new Show(ref);
    }

});
