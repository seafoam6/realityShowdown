= RealityShowdown

A phone app using Ionic, Angular, and Firebase to watch and enjoy Rupaul's drag race with friends. Points are acquired by predicting the winning queens.

The stuff is kind of a mess. I was in the middle of working on the scoring feature.

It does work in that people can create a login, and vote for a week that's open.

Things that would be great for anyone to work on if they have time:

* Twitter or facebook login. - I am working on these in a seperate branch. Hope to have this done mid sunday. 
* Refactoring. There's a lot of mess because I wasn't used to working with firebase. A lot of stuff can be put in factories/services to seperate concerns.
* TDD: good luck with that.
* Scoring. I am thinking each week 10 points participation. 20 for matching a previous week. 30 for matching the current week. Each point is going to be a node on the player. I hope to have this done before episode 2.
* General look and feel. Theres' a lot of native Ionic functionality that could be added pretty easily and would make a big difference.
* Scoreboard page. Page to compare everyones scores, high scores, etc.

Hopefully you can help with the project!!!

To make the app work you need to make a file called 'secret.js' and put it in the www folder. below are the contents of that file.

Let me know if you need the address to the database. I don't feel safe puting it on the open where people could jones with it. 
```
angular.module('App')
.constant('FURL', 'https://addresstotheapphere.firebaseio.com/')
```