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
};

app.controller('controllerMail', function ($scope, $http, $modal, factoryMail ) {
    console.log("Wir sind im Controller");
    $scope.debugOutput = '';
    $scope.folders = '';
    $scope.mails = '';
    $scope.selectedFolder = '';

    $scope.removeFolder = function (folder) {factoryMail
        factoryMail.deleteFolder(folder).success(function (data) {
            $scope.debugOutput = data;
            getAllFolders(factoryMail, $scope);
        })
    };

    $scope.selectFolder = function (folder) {
        $scope.selectedFolder = folder;
        console.log("controllerMail.selectfolder: "+$scope.selectedFolder);
        factoryMail.getMailsFromFolder(folder).success(function (data) {
            $scope.mails = data;
        })
    };

    $scope.removeMail = function (mail) {
        console.log("controllerMail.removeMail "+mail);
        factoryMail.deleteMail(mail).success(function (data) {
            $scope.debugOutput = data;
            console.log("removeMail "+mail.folder);
            $scope.selectFolder(mail.folder);
        });
    };

    $scope.showMail = function (mail) {
        console.log("controllerMail.showMail "+ mail);
    };

    getAllFolders(factoryMail, $scope);

});

app.controller('RenameModalCtrl', function ($scope,$modal) {
    $scope.animationsEnabled = true;

    $scope.open = function () {
        console.log("REnameModalCtrl.open: "+$scope.selectedFolder);


        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'RenameInstanceCtrl',
            resolve: {
                items: function () {
                    return $scope.newFolderName;
                }
            },
            scope: $scope
        });

        modalInstance.result.then(function (newFolderName) {
            $scope.outPut = newFolderName;
        });
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('RenameInstanceCtrl', function ($scope, $modalInstance, factoryMail) {
    console.log("RenameInstanceCtrl.(): "+$scope.selectedFolder);
    $scope.ok = function () {
        console.log("alter name: "+ $scope.selectedFolder + "neuer Name: "+$scope.newFolderName);
        factoryMail.renameFolder($scope.selectedFolder, $scope.newFolderName).success(function (data) {
            $scope.debugOutput = data;
            getAllFolders(factoryMail, $scope);
        });
        $modalInstance.close($scope.newFolderName);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('ModalNewMailCtrl', function ($scope, $modal, $log) {

    $scope.jnewMail = {
        sender: '',
        recipients: '',
        text: '',
        date: '',
        folder: '',
        subject: ''
    }
    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'newMail.html',
            controller: 'NewMailInstanceCtrl',
            size: size,
            scope: $scope
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
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

app.controller('NewMailInstanceCtrl', function ($scope, $modalInstance, factoryMail) {

    $scope.ok = function () {
        console.log($scope.jnewMail);
        factoryMail.newMail($scope.jnewMail).success(function (data) {
            $scope.debugOutput = data;
            console.log("mail versendet "+data);
        })
        $modalInstance.close($scope.jnewMail);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
