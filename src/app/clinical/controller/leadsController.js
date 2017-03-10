app.controller('leadsCtrl', function ($scope, $q, $location, clientDBService, $http, $rootScope, $routeParams, $window) {

    console.log("leadsCtrl Controller reporting for duty.");
    $q.when()
            .then(function () {
                clientDBService.getDB().then(function (responseData, status, headers, config) {
                    $scope.DbForActive = [];
                    angular.forEach(responseData.APIData, function (val, key) {
                        this.push(val.Name);
                    }, $scope.DbForActive);
                    $scope.tempDb = $scope.DbForActive.toString();
                    $scope.getLeaderList();
                });
            });

    $scope.currentPage = 1;
    $scope.itemPerPage = 51;
    $scope.alignFix = function () {
        setTimeout(function () {
            var heights = [];
            $('.clientAlign').each(function () {
                if (typeof $(this).attr('id') != 'undefined' && $(this).is(":visible")) {
                    var id = $(this).attr('id').split('-');
                    heights.push($(this).css('height').replace('px', ''));
                    if (id[1] % 3 == 0) {
                        var maxHeight = Math.max.apply(null, heights);
                        for (i = 3; i >= 1; i--) {
                            $('#' + id[0] + '-' + String(id[1])).css('height', maxHeight + 'px');
                            id[1] = id[1] - 1;
                        }
                        heights = [];
                    }
                }
            });
        }, 1500);
    };
    /* Variable in itialize for Pagination*/
    $scope.countedRecords = 0;
    $scope.maxSize = 5;
    $scope.startPage;
    $scope.endPage;
    /* Load Client List*/
    $scope.getLeaderList = function (getUrl) {
        $scope.loader = true;
        if ($scope.currentDB == 'ALL') {
            $scope.currentDBAsParam = $scope.tempDb;
        } else {
            $scope.currentDBAsParam = $scope.currentDB;
        }
        if (getUrl != undefined) {
            var url = getUrl;
        } else {
            var url = 'common/data?id=GetLBLeadList' + "&PageNumber=" + $scope.currentPage + '&PageSize=' + $scope.itemPerPage+ "&SearchKeyword=";
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
            if (responseData.APIData.length > 0) {
                $scope.noSearchFound = true;
                $scope.noRecordFound = true;
                $scope.noDataFound = false;
            } else {
                $scope.noSearchFound = true;
                $scope.noRecordFound = false;
                $scope.noDataFound = true;
            }
            $scope.countedRecords = responseData.APICount[0].APICount;
            $scope.numberOfPatient = Math.ceil($scope.countedRecords / $scope.itemPerPage);
            $scope.leaderList = responseData.APIData;
            $scope.leaderList = angular.copy(responseData.APIData);
        }).error(function (responseData, status, headers, config) {
            $scope.loader = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    /*search client in all client tab*/
    $scope.searchLeaderList = function (searchval) {
        $scope.searchTrimData = (searchval) ? searchval : '';
        var url = 'common/data?id=GetLBLeadList&PageNumber=1&PageSize=' + $scope.itemPerPage +"&SearchKeyword=" + $scope.searchTrimData;
        $scope.getLeaderList(url);
    }
    /*end  search*/
    /* New Page In Pagination*/
    $scope.getNewPageData = function (pageIndexNumber) {
        $scope.currentPage = pageIndexNumber;
        if (angular.isUndefined($scope.searchTrimData)) {
            $scope.searchTrimData = '';
        }
        var url = 'common/data?id=GetLBLeadList&PageNumber=' + $scope.currentPage + '&PageSize=' + $scope.itemPerPage +"&SearchKeyword=" + $scope.searchTrimData ;
        $scope.getLeaderList(url);
    }
    /* Show User*/
    $scope.showUser = function (id) {
        $location.path("/clinical/leaderDetail/leader Profile/" + id);
    }
});
