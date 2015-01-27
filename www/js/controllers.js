angular.module('starter.controllers', [])

.controller('ParametersCtrl', function($scope, Parameters) {
  function range(begin, end) {
    for (var i = begin; i < end; ++i) {
      return i;
    }
  }

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
  Parameters.success(function(data) {
    // TODO: Difficulty is hard-coded right now
    $scope.parameters = generateTypeCooker(data.parametersData, 2);
    $scope.doRefresh = function() {
      $scope.parameters = null;
      $scope.parameters = generateTypeCooker(data.parametersData, 2);
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply();
    };
  })

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

// .controller('ByStyleDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true,
    difficulties: [
      { name: 'Starter',     'value': 1 },
      { name: 'Easy',        'value': 2 },
      { name: 'Class',       'value': 3 },
      { name: 'Experienced', 'value': 4 },
      { name: 'Pro',         'value': 5 }
    ],
  };
  $scope.settings.difficulty = $scope.settings.difficulties[1]
});
