app.controller('MainController', function($scope){
  $scope.title = 'Follow the White Rabbit';
});

app.controller('controllerMail', function($scope, $http, factoryMail) {
  //Testing the scope!
  $scope.title = 'Follow the White Rabbit';

  //Get folders from Database
  factoryMail.getFolders().success(function(data) {
    $scope.folders = data;
    console.log("controllerMail.factoryMail.getFolders() "+data[0]);
    $scope.folders=data;
    console.log(data);
  }).error(function(data, status) {
    console.log("error: " ,data, status);
    $scope.folders = [];
  });

  // //Get mails by folder
  // factoryMail.getByFolder().success(function(data){

  // }).error(function(data, status) {

  // });

  // //Get mail by _id
  // factoryMail.getMail().success(function(data){

  // }).error(function(data, status) {

  // });

  // //Delete mail by _id
  // factoryMail.deleteMail().success(function(data){

  // }).error(function(data, status) {

  // });

  // //Delete folder by foldername
  // factoryMail.deleteFolder().success(function(data){

  // }).error(function(data, status) {

  // });

  //Rename folder
  // factoryMail.renameFolder().success(function(data){

  // }).error(function(data, status) {

  // });

  // // //Move folder by foldername
  // factoryMail.moveMail().success(function(data){

  // }).error(function(data, status) {

  // })

  // //Create new mail
  // factoryMail.newMail().success(function(data){

  // }).error(function(data, status) {

  // });
});
