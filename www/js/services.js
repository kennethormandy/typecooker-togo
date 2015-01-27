angular.module('starter.services', [])

// Based on http://stackoverflow.com/a/16931623/864799
.factory('Parameters', function($http) {
  // https://rawgit.com/kennethormandy/typecooker-ingredients/master/index.json
  var apiURL = 'js/data.json';
  return $http.get(apiURL);
})

.factory('Difficulties', function() {
  var difficulties = [
    { name: 'Starter',     value: 1 },
    { name: 'Easy',        value: 2 },
    { name: 'Class',       value: 3 },
    { name: 'Experienced', value: 4 },
    { name: 'Pro',         value: 5 }
  ];

  return {
    all: function() {
      return difficulties;
    },
    get: function(difficultyID) {
      return difficulties[difficultyID - 1];
    }
  }
})

.factory('DataStore', function(Difficulties) {
  // Feel like I shouldn’t have to duplicate this…
  var DataStore = {
    difficulty: Difficulties.get(2)
  }

  DataStore.setDifficulty = function(value) {
    DataStore.difficulty = Difficulties.get(value);
  }

  return DataStore;

})
