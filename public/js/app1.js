angular.module('myApp',[]).controller('mainController',function($scope, $log, $filter) {
  $log.log("Hello.");
  $log.info("This is some information.");
  $log.warn("Warning!");
  $log.debug("Some debug information while writing my code.");
  $log.error("This was an error!!!");
  $scope.name = 'Aladdin';
  $scope.uppercasename = $filter('uppercase')($scope.name);
  $log.info($scope.name);
  $log.info($scope.uppercasename); 
});