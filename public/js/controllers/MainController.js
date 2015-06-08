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

app.controller('controllerMail', function ($scope, factoryMail) {
  console.log("Wir sind im Controller");
  // $scope.getFolders = factoryMail.getFolders();
  $scope.getFolders = function () {
    console.log("In DER function!");
    factoryMail.getFolders().success(function (data) {
      console.log("Data" + data);
    });
  };
  console.log($scope.getFolders);
});
