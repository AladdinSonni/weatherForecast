var weatherApp = angular.module('weatherApp', ['ngRoute','ngResource']);

// ROUTES
weatherApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'homeController'
  })
  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })
  .when('/forecast/:days', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })
});

// SERVICES
weatherApp.service('cityService', function(){
	
  this.city = "Tripoli, LY";

});

weatherApp.service('weatherService',['$resource', function($resource){
  
  this.GetWeather = function(city, days){
    
    var weatherAPI =  $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
      callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}});
    
    return weatherAPI.get({ q: city, cnt: days , appid: "bd82977b86bf27fb59a04b61b657fb6f" });
  
  }

}]);

weatherApp.filter('startFrom', function() {
  return function(input, start) {
    if(input) {
      start = +start; //parse to int
      return input.slice(start);
    }
    return [];
  }
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService){
  
  $scope.city = cityService.city;

  $scope.$watch('city', function(){
  	cityService.city = $scope.city;
  });

  $scope.submit = function(){
    $location.path("/forecast");
  };

}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', 'weatherService', function($scope, $routeParams, cityService, weatherService){
  
  $scope.city = cityService.city;

  $scope.days = $routeParams.days || '2';

  $scope.weatherResult = weatherService.GetWeather($scope.city, $scope.days);

  $scope.convertToFahrenheit = function(degK){
  	return Math.round((1.8 * (degK - 273)) + 32);
  }

  $scope.convertToCelsius = function(degK){
  	return Math.round(degK - 273);
  }

  $scope.convertToDate = function(dt){
  	return new Date(dt * 1000);
  }

  $scope.currentPage = 0;
  $scope.pageSize = 2;
  $scope.numberOfPages=function(){
    return Math.ceil($scope.days/$scope.pageSize);                
  }

}]);


// // DTRECTIVES
// weatherApp.directive("weatherReport", function(){
//   return {
//     restrict: 'E',
//     templateUrl: 'directives/weatherReport.html',
//     replace: true,
//     scope: {
//       weatherDay: "=",
//       convertToStandard: "&",
//       convertToDate: "&",
//       dateFormat: "@"
//     }
//   }
// });