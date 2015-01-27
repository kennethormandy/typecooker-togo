angular.module('starter.services', [])

// Based on http://stackoverflow.com/a/16931623/864799
.factory('Parameters', function($http) {
  // https://rawgit.com/kennethormandy/typecooker-ingredients/master/index.json
  var apiURL = 'js/data.json';
  return $http.get(apiURL);
});
