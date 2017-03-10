app.controller('myProfileCtrl', function ($scope, $rootScope, $routeParams, $location, $http) {
    $scope.currentState = $routeParams.checkState;
    if ($rootScope.userDetails.ReferenceID == 0) {
        $scope.editShow = true;
    } else {
        $scope.editShow = false;
    }
    $scope.templateListStaff = {
        'description': 'app/layout/view/userDescription.html',
        'password': 'app/layout/view/changePassword.html',
        'edit': 'app/layout/view/editProfile.html'
    };
    $scope.selectedStaffTemplate = $scope.templateListStaff[$scope.currentState];
    $scope.checkState = function (selectedState) {
        if (selectedState == 'password') {
            $scope.selectedStaffTemplate = $scope.templateListStaff['password'];
            $location.path('/myProfile/' + selectedState);
        } else if (selectedState == 'edit') {
            $scope.selectedStaffTemplate = $scope.templateListStaff['edit'];
            $location.path('/myProfile/' + selectedState);
        } else {
            $scope.selectedStaffTemplate = $scope.templateListStaff['description'];
            $location.path('/myProfile/' + 'description');
        }

    };
});