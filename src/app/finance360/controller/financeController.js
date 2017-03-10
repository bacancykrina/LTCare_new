app.controller('finance360Ctrl', function ($scope, $rootScope, $location, $http, $window, $routeParams) {
    console.log('finance360Ctrl reporting for duty');
    $scope.currentPage = 1;
    $scope.itemPerPage = 51;
    $scope.searchTrimData = '';

    $scope.getFinanceProfiles = function (url) {
        $scope.loader = true;
        $scope.countedRecords = 0;
        $scope.financeProfiles = [];
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;

        if (url != undefined) {
            var url = url;
        } else {
            var url = 'common/data/GetFinPatientBySearch?PageNumber=' + $scope.currentPage + '&PageSize=' + $scope.itemPerPage + '&SearchKeyword=' + $scope.searchTrimData + '&Filter1=all';
        }
        var userData = {
            'SearchKeyword': ''
        };
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
            if (status == 200) {

                $scope.countedRecords = responseData.APICount[0].APICount;
                $scope.numberOfPatient = Math.ceil($scope.countedRecords / $scope.itemPerPage);
                if ($scope.numberOfPatient <= 10) {
                    // less than 10 total pages so show all
                    $scope.startPage = 0;
                    $scope.endPage = $scope.numberOfPatient;
                } else {
                    // more than 10 total pages so calculate start and end pages
                    $scope.startPage = 0;
                    $scope.endPage = 10;
                }
                // create an array of pages to ng-repeat in the pager control
                $scope.pagedItems = ($scope.startPage, $scope.endPage);
                if (responseData.APIData.length > 0) {
                    $scope.noSearchFound = true;
                    $scope.noRecordFound = true;
                    $scope.noDataFound = false;
                } else {
                    $scope.noSearchFound = false;
                    $scope.noRecordFound = false;
                    $scope.noDataFound = true;
                }
                $scope.financeProfiles = responseData.APIData;
                $scope.financeProfiles = angular.copy(responseData.APIData);
            }
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
        // getFinanceProfiles end
    }
    setTimeout(function () {
        $scope.getFinanceProfiles();
    }, 3000)
    $scope.showFinanceClient = function (id) {
        $location.path('/finance360/allClients/Claim Details/' + id);
    }
    $scope.getNewFinanceProfiles = function (currentPage, searchFinance) {
        $scope.searchTrimData = searchFinance;
        if (angular.isUndefined($scope.searchTrimData)) {
            $scope.searchTrimData = '';
        }
        $scope.currentPage = currentPage;
        var url = 'common/data/GetFinPatientBySearch?PageNumber=' + $scope.currentPage + '&PageSize=' + $scope.itemPerPage + "&SearchKeyword=" + $scope.searchTrimData + "&Filter1=all";
        $scope.getFinanceProfiles(url);
    }
    $scope.searchByFinanceName = function (searchFinance) {
        $scope.searchTrimData = (searchFinance) ? searchFinance : '';
        var url = 'common/data/GetFinPatientBySearch?PageNumber=1&PageSize=' + $scope.itemPerPage + "&SearchKeyword=" + $scope.searchTrimData + "&Filter1=all";
        $scope.getFinanceProfiles(url);
    }
});