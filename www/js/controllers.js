angular.module('starter.controllers', [])

.controller('ParametersCtrl', function($scope, Parameters, DataStore) {
  // MIT via http://git.io/F3Hx
  var generateTypeCooker = function(data, level) {
    var result = [];
    data['keys'].forEach(function(key, index, array) {
      var pool = [];
      var item;
      var weightCount;

      for(var i = 0; i < data[key].length; i++) {
        item = data[key][i];
        if(item.level <= level) {
          // TODO: Account for weighting
          // for(weightCount in range(item.weight)) {
            item.key = key;
            pool.push(item);
          // }
        }
      }
      if(pool.length > 0) {
        var randomPick = pool[Math.floor(Math.random()*pool.length)];
        result.push(randomPick);
      }
    });
    return result;
  }

  $scope.parameters = 'Loading…';
  Parameters
    .success(function(data) {
      // TODO: Difficulty is hard-coded right now
      $scope.parameters = generateTypeCooker(data.parametersData, DataStore.difficulty.value);
      $scope.refresh = function() {
        $scope.parameters = null;
        $scope.parameters = generateTypeCooker(data.parametersData, DataStore.difficulty.value);
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();
      };
    })
    .error(function(data, status, headers, config) {
      console.error('ERR', data);
    });
})

.controller('SettingsCtrl', function($scope, Difficulties, DataStore) {
  $scope.settings = {
    enableFriends: true,
    difficulties: Difficulties.all()
  };
  $scope.settings.difficulty = DataStore.difficulty;
  $scope.updateDifficulty = function() {
    DataStore.setDifficulty($scope.settings.difficulty.value);
  }
});
