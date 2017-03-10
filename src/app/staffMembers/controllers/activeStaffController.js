app.controller('activeStaffCtrl', function ($scope, $location, $http, $rootScope, $timeout) {
    console.log('activeStaffCtrl reporting for duty');
    $scope.activeStaffOptions = {allowClear: true};
    $scope.clearActiveStaff = function(){
        $timeout(function () {
            var temp = $('#activestaff').select2();
            temp.val('Select Specialization').trigger("change");
        });
    }
    $scope.currentPage = 1;
    $scope.itemPerPage = 51;
    /* Variable in itialize for Pagination*/
    $scope.countedRecords = 0;
    $scope.maxSize = 5;
    $scope.startPage;
    $scope.endPage;
    $scope.getStaffList = function (getUrl) {
        $scope.loader = true;
        if (getUrl != undefined) {
            var url = getUrl;
        } else {
            var url = "common/data/?id=GetStaffLists&PageNumber=" + $scope.currentPage + "&PageSize=" + $scope.itemPerPage + "&IsActive=1&SearchKeyword=";
        }
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + url,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loader = false;
            //$scope.activeStaff = 'Select Specialization';
            $scope.activeDropDown = [];

            $scope.activeDropDown.push("Select Specialization");
            angular.forEach(responseData.Table2, function (value, key) {
                this.push(value.Specialization);
            }, $scope.activeDropDown);
            $scope.noDataFound = false;
            $scope.countedRecords = responseData.APICount[0].APICount;
            if($scope.countedRecords == 0){
                $scope.noDataFound = true;
            }
            $scope.numberOfPatient = Math.ceil($scope.countedRecords / $scope.itemPerPage);
            $scope.activeStaffList = responseData.APIData;
            $scope.activeStaffList = angular.copy(responseData.APIData);
        }).error(function (responseData, status, headers, config) {
            $scope.loader = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }
    setTimeout(function () {
        $scope.getStaffList();
    }, 1000)
    /* New Page In Pagination*/
    $scope.getNewPageData = function (pageIndexNumber,activeStaff) {
        $scope.currentPage = pageIndexNumber;
        if (angular.isUndefined($scope.searchTrimData)) {
            $scope.searchTrimData = '';
        }
        var url = 'common/data/?id=GetStaffLists&PageNumber=' + $scope.currentPage + '&PageSize=' + $scope.itemPerPage + "&IsActive=1&SearchKeyword=" + $scope.searchTrimData + '&Filter1=' + activeStaff;
        // window.history.replaceState("", "", "/#/staffMembers/" + $scope.staffType + "/" + $scope.currentPage);
        $scope.getStaffList(url);
    }
    $scope.searchActiveStaff = function (searchStaff,activeStaff) {
        $scope.searchTrimData = (searchStaff) ? searchStaff : '';
        $scope.activeStaff = (activeStaff) ? activeStaff : '';
        var url = "common/data/?id=GetStaffLists&PageNumber=1&PageSize=" + $scope.itemPerPage + "&IsActive=1&SearchKeyword=" + $scope.searchTrimData + '&Filter1=' + $scope.activeStaff;
        $scope.getStaffList(url);
    }
    /* Show Staff*/
    $scope.showStaff = function (id) {
        $location.path("/staffMembers/staffDetail/profile/" + id);
    }
});