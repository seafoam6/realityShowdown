angular.module('App').factory('Utils', function($ionicLoading,$ionicPopup, $log) {

	var Utils = {

    show: function() {
      $ionicLoading.show({
  	    animation: 'fade-in',
  	    showBackdrop: false,
  	    maxWidth: 200,
  	    showDelay: 500,
        template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
      });
    },

    hide: function(){
      $ionicLoading.hide();
    },

		alertshow: function(tit,msg){
			var alertPopup = $ionicPopup.alert({
				title: tit,
				template: msg
			});
			alertPopup.then(function(res) {
				//console.log('Registrado correctamente.');
			});
		},

		errMessage: function(err) {

	    var msg = "Unknown Error...";

	    if(err && err.code) {
	      switch (err.code) {
	        case "EMAIL_TAKEN":
	          msg = "This Email has been taken."; break;
	        case "INVALID_EMAIL":
	          msg = "Invalid Email."; break;
          case "NETWORK_ERROR":
	          msg = "Network Error."; break;
	        case "INVALID_PASSWORD":
	          msg = "Invalid Password."; break;
	        case "INVALID_USER":
	          msg = "Invalid User."; break;
	      }
	    }
			Utils.alertshow("Error",msg);
	},

  //QUEENS
    calcLoserQueens: function(weeks){
      var removedQueens = [];
      _.map(weeks, function getLosers(value, index, list){

        if(typeof value.loser !== "undefined") {
            removedQueens.push(value.loser.name)
        }
    
      })

      return removedQueens;
      //$log.log(removedQueens)
    },
    removeLoserQueens: function(losers, allQueens){
      var nonLosers = allQueens;
      //$log.log('losers', losers)
      _.forEach(losers, function(value, key){
        nonLosers = _.filter(nonLosers, function(o) { 
          return o.name != losers[key] 
        })
      })
      //$log.log('nonlosers', nonLosers);
      return nonLosers;

    },

    filterOutHelpers: function(data){
      var newData = _.filter(data, function(value, index, collection) { 
          return value.charAt(0) != '$'; 
        });

      return newData
    },

    findUserByTwitterId: function(data){
      var newData;
      return newData
    }


  };

	return Utils;

})
.filter('getImg', function() {
  return function(input) {
    
       input = input.replace(/\s+/g, '-').toLowerCase();
      //$log.log(url + '.png')
      return input + '.png'
    
  };
})