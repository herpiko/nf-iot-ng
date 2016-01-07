'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$scope", "$rootScope", "$http", function($scope, $rootScope,  $http) {
  $scope.theft = false;
  $rootScope.socket = io("http://128.199.95.141:2999");
  
  $rootScope.socket.on("whoareu", function(){
    console.log("middleware asking whoareu");
    $rootScope.socket.emit("join-ng");
  })
  $scope.dht11Data = [
    [1],
    [2]
  ]
  $scope.dht11Series = ["Temperature", "Humidity"];

  var updateDht11 = function(data){
    if ($scope.dht11Data[0].length >= 10) {
     $scope.dht11Data[0].shift();
    } 
    if ($scope.dht11Data[1].length >= 10) {
     $scope.dht11Data[1].shift();
    } 
    $scope.dht11Data[0].push(data.temp);
    $scope.dht11Data[1].push(data.humid);
    console.log($scope.dht11Data);
  $scope.$apply();
  }
  $rootScope.socket.on("image", function(data){
    console.log(data);
    $scope.image = "data:image/png;base64," + data;
  })
  $rootScope.socket.on("message", function(data){
    console.log(data);
    updateDht11(data); 
    $scope.theft = data.theft;
  })
  $scope.labels = ["9","8","7","6","5","4","3","2","1","0"];
  $scope.series = ['Temperature', 'Humidity'];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  $scope.led1 = function(value){
    $http({
      method : "POST",
      url : "http://128.199.95.141:2999/api/led1?value=" + value
    })
    .success(function(data, status){
      console.log(data);
    })
    .error(function(data, status){
      console.log(data);
    })
  }
  $scope.led2 = function(value){
    $http({
      method : "POST",
      url : "http://128.199.95.141:2999/api/led2?value=" + value
    })
    .success(function(data, status){
      console.log(data);
    })
    .error(function(data, status){
      console.log(data);
    })
  }
  $scope.camera = function(){
    $http({
      method : "POST",
      url : "http://128.199.95.141:2999/api/image"
    })
    .success(function(data, status){
      console.log(data);
    })
    .error(function(data, status){
      console.log(data);
    })
  }

}]);
