 app.controller('staffMemberCtrl', function ($scope, $filter, $location,$rootScope, $routeParams, staffMembersService) {
    console.log("staffMemberCtrl Controller reporting for duty.");
    $scope.staffType = $routeParams.paramstaffType;
    $rootScope.isActiveStaff = 1;
    //$scope.pageNumber = $routeParams.pageNumber;

    $scope.templateList = {
        'active': 'app/staffMembers/view/activeStaff.html',
        'terminated': 'app/staffMembers/view/inactiveStaff.html'
    };
    /* Give selected View*/
    $scope.selectedTemplate = $scope.templateList[$scope.staffType];

    $scope.selectStaffType = function (staffType) {
        $scope.staffType = staffType;
        if($scope.staffType == 'active'){
            $rootScope.isActiveStaff = 1;
        }else {
            $rootScope.isActiveStaff = 0;
        }
        //$location.path("/staffMembers/" + $scope.staffType + "/" + $scope.pageNumber);
        $location.path("/staffMembers/" + $scope.staffType);
    }
//    $scope.activeStaffService = staffMembersService.getActiveStaff().then(function (activeStaffList) {
//        $scope.activeStaffList = activeStaffList.APIData;
//    });
//    $scope.inactiveStaffService = staffMembersService.getInActiveStaff().then(function (inactiveStaffList) {
//        $scope.inactiveStaffList = inactiveStaffList.APIData;
//    });
});
