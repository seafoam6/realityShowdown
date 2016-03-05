'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages'])
.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })
    .state('admin', {
      url: '/admin',
      views:{
        "":{
          templateUrl: 'views/admin/admin.html'
        },
        "footer":{
          templateUrl:'views/footer.html'
        }        
      }
    })
    .state('queenAdmin', {
      url: '/queenAdmin',
      views:{
        "":{
          templateUrl: 'views/admin/queenAdmin.html',
          controller:'queenController'
        },
        "footer":{
          templateUrl:'views/footer.html'
        }        
      }
    })
    .state('weekAdmin', {
      url: '/weekAdmin',
      views:{
        "":{
          templateUrl: 'views/admin/weekAdmin.html',
          controller:'weekController'
        },
        "footer":{
          templateUrl:'views/footer.html'
        }        
      }
    })
    .state('vote', {
      url: '/vote',
      views:{
        "":{
          templateUrl: 'views/vote/vote.html',
          controller:'voteController'
        },
        "footer":{
          templateUrl:'views/footer.html'
        }        
      }
    })
    .state('home', {
      url: '/home',
      views:{
        "":{
          templateUrl: 'views/home/home.html',
          controller:'homeController'
        },
        "footer":{
          templateUrl:'views/footer.html'
        } 
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
});
