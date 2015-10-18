angular.module('myApp',[]).controller('mainController', ['$scope', '$filter', function($scope, $filter) {
  $scope.alertClick = function() {
    alert("clicked!");
  };
  $scope.name = 'Aladdin';
}]);