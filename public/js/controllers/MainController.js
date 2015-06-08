app.controller('MainController', function($scope){
  $scope.title = 'Follow the White Rabbit';
});

app.controller('TestController', function ($scope, Test) {
  Test.success(function(data){
    $scope.test = data;
  }).error(function(data, status){
    console.log(data, status);
    $scope.test = [];
  });
});

app.controller('MailsController', function ($scope, Mails) {
  Mails.success(function (data){
    $scope.mails = data;
  }).error(function (data, status){
    console.log (data, status);
    $scope.mails = [];
  });
});

app.controller('controllerMail', function ($scope,$http, factoryMail) {
  console.log("Wir sind im Controller");
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
