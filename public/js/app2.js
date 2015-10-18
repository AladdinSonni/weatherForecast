angular.module('myApp',['ngMessages']).controller('mainController', 
['$scope','$log',
function($scope, $log, $filter) {
  $log.info($scope);
}]);

// Minifide version, Do not swap $scope & $log in the list befor function and the function well always be the last item of the list
// angular.module('myApp',['ngMessages']).controller('mainController',['$scope','$log',function(a,b)
// {b.info(a);}]);