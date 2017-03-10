app.controller('clinicalCtrl', function ($scope,clientDBService, $location, $rootScope,$routeParams,$localStorage) {
    $scope.currentDB = $routeParams.paramDbName;
    $scope.clientType = $routeParams.clientType;
//    $scope.pageNumber = $routeParams.pageNumber;
    $scope.templateList = {
        'allclient': 'app/clinical/view/allClients.html',
        'active': 'app/clinical/view/activeClients.html',
        'inactive': 'app/clinical/view/inActiveClients.html',
        'lead': 'app/clinical/view/leads.html'
    };
    /* Give selected View*/
    $scope.selectedTemplate = $scope.templateList[$scope.clientType];
    /*Give Current DbName */
    $scope.getDataByDbName = function (selectedDB) {
        $scope.currentDB = selectedDB;
        $location.path("/clinical/" + $scope.currentDB + "/allclient");
    };
    $scope.getDBDataBy = function (selectedType) {
        $scope.clientType = selectedType;
        $location.path("/clinical/" + $scope.currentDB + "/" + $scope.clientType);
    };
    /*Load All DbList */
    $scope.getListOfAllDb = function () {
        $scope.loader = true;
        clientDBService.getDB().then(function (responseData, status, headers, config) {
            $scope.loader = false;
            $scope.dbList = [];
            $scope.dbList.push({'Id': 'ALL', 'Name': 'ALL'});
            for (i = 0; i < responseData.APIData.length; i++) {
                $scope.dbList.push(responseData.APIData[i]);
            }
        });
    }
    $scope.getListOfAllDb();
    $scope.$watch('currentDB', function (newValue, oldValue) {
        $localStorage.dbParam = JSON.stringify(newValue);
        $rootScope.dbUser = JSON.parse($localStorage.dbParam);
    });

    $scope.$watch('clientType', function (newValue, oldValue) {
        $localStorage.typeParam = JSON.stringify(newValue);
        $rootScope.typeParam = JSON.parse($localStorage.typeParam);
    });

});
