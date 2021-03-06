'Use Strict';

var footer = {
  templateUrl:'views/footer/footer.html',
  controller:'footerCtrl'
}      
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages'])
.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('admin', {
      url: '/admin',
      views:{
        "":{
          templateUrl: 'views/admin/admin.html'
        },
        "footer":footer  
      }
    })
    .state('queenAdmin', {
      url: '/queenAdmin',
      views:{
        "":{
          templateUrl: 'views/admin/queenAdmin.html',
          controller:'queenController'
        },
        "footer":footer     
      }
    })
    .state('weekAdmin', {
      url: '/weekAdmin',
      views:{
        "":{
          templateUrl: 'views/admin/weekAdmin.html',
          controller:'weekController'
        },
        "footer":footer    
      }
    })
    .state('vote', {
      url: '/vote',
      views:{
        "":{
          templateUrl: 'views/vote/vote.html',
          controller:'voteController'
        },
        "footer":footer     
      }
    })
    .state('prevVote', {
      url: '/vote/:week/:id',
      views:{
        "":{
          templateUrl: 'views/prevVote/prevVote.html',
          controller:'prevVoteCtrl',
          controllerAs: 'vm'
        },
        params:{
          week:'week',
          id:'id'
        },
        "footer":footer     
      }
    })
    .state('scoreBoard', {
      url: '/scoreBoard',
      views:{
        "":{
          templateUrl: 'views/scoreBoard/scoreBoard.html',
          controller:'scoreBoardController'
        },
        "footer":footer     
      }
    })
    .state('pointsAdmin', {
      url: '/pointsAdmin',
      views:{
        "":{
          templateUrl: 'views/admin/pointsAdmin.html',
          controller:'pointsController',
          controllerAs: 'vm'
        },
        "footer":footer     
      }
    })

    .state('profile', {
      url: '/profile/:id',
      views:{
        "":{
          templateUrl: 'views/profile/profile.html',
          controller:'profileCtrl',
          controllerAs: 'vm'
        },
        params:{
          id:'id'
        },
        "footer":footer     
      }
    })
    .state('home', {
      url: '/home',
      views:{
        "":{
          templateUrl: 'views/home/home.html',
          controller:'homeController'
        },
        "footer":footer
      }
      
    })
    ;
$urlRouterProvider.otherwise("/login");
})
.constant('FURL', 'https://dragrace.firebaseio.com/')
// Changue this for your Firebase App URL.
.constant('lodash', window._)
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
