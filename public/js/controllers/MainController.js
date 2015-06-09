app.controller('MainController', function($scope){
  $scope.title = 'Follow the White Rabbit';
});

app.controller('controllerMail', function ($scope, $http, factoryMail) {
  //Testing the scope!
  $scope.title = 'Follow the White Rabbit';

  //getFolders from Database
  factoryMail.getFolders().success(function (data) {
    $scope.folders = data;
    console.log("controllerMail.factoryMail.getFolders() "+data[0]);
    $scope.folders=data;
    console.log(data);
  }).error( function (data, status) {
    console.log("error: " ,data, status);
    $scope.folders = [];
  });
});
