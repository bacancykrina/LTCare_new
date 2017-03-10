app.controller('sidebarCtrl', function ($scope, $location, $rootScope, $localStorage) {

    var tempType = $rootScope.typeParam ? $rootScope.typeParam : 'allclient';
    var db_name = $rootScope.dbUser ? $rootScope.dbUser : 'ALL';
    $scope.type = tempType.replace(/['"]+/g, '');

    $scope.getClientTabPath = function (type) {
        $scope.type = type;
        $location.path('/clinical/' + db_name + '/' + type);
    }

    $rootScope.logout = function () {
        //$localStorage.$reset('userDetails');
        delete $rootScope.userDetails;
        window.location.replace(window.location.origin + '/');
    };
});