app.controller('MainController', function ($scope) {
    $scope.title = 'Follow the White Rabbit';
});

function getAllFolders(factoryMail, $scope) {
    factoryMail.getFolders().success(function (data) {
        $scope.folders = data;
        console.log("controllerMail.factoryMail.getFolders() " + data[0]);
        $scope.folders = data;
        console.log(data);
    }).error(function (data, status) {
        console.log("error: ", data, status);
        $scope.folders = [];
    });
}
app.controller('controllerMail', function ($scope, $http, factoryMail) {
    console.log("Wir sind im Controller");
    $scope.debugOutput = '';
    $scope.folders = '';
    $scope.mails = '';
    $scope.selectedFolder = '';

    $scope.removeFolder = function (folder) {
        factoryMail.deleteFolder(folder).success(function (data) {
            $scope.debugOutput = data;
            getAllFolders(factoryMail, $scope);
        })
    };

    $scope.selectFolder = function (folder) {
        $scope.selectedFolder = folder;
        factoryMail.getMailsFromFolder(folder).success(function (data) {
            $scope.mails = data;
        })
    };

    getAllFolders(factoryMail, $scope);


});

app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (newFolderName) {
            $scope.newFolderName = newFolderName;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
    $scope.newFolderName = '';

    $scope.ok = function () {
        $modalInstance.close($scope.newFolderName);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});