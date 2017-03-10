app.controller('allClientsCtrl', function ($scope, $q, clientDBService, $location, $http, $rootScope,$timeout) {
    console.log("allClientsCtrl Controller reporting for duty.");
    $scope.allClientsOptions = {allowClear: true};
    $scope.clearDropdown = function () {
        $timeout(function () {
            var temp = $('#temp').select2();
            temp.val('Select Physician').trigger("change");
        });
    }

    $scope.currentPage = 1;
    $scope.itemPerPage = 51;
    $scope.allClients = "Select Physician";
    $q.when()
            .then(function () {
                clientDBService.getDB().then(function (responseData, status, headers, config) {
                    $scope.DbForActive = [];
                    angular.forEach(responseData.APIData, function (val, key) {
                        this.push(val.Name);
                    }, $scope.DbForActive);
                    $scope.tempDb = $scope.DbForActive.toString();
                    $scope.getClientList();
                    $scope.initPhysicianAllClients();
                });
            });

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
    $scope.getClientList = function (getUrl) {
        $scope.loader = true;
        if ($scope.currentDB == 'ALL') {
            $scope.currentDBAsParam = $scope.tempDb;
        } else {
            $scope.currentDBAsParam = $scope.currentDB;
        }

        if (getUrl != undefined) {
            var url = getUrl;
        } else {
            var url = 'common/data?id=GetPatientsDatabySearch&patientId=0' + "&PageNumber=" + $scope.currentPage + '&PageSize=' + $scope.itemPerPage + "&SearchKeyword=" + "&dbName=" + $scope.currentDBAsParam;
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
            if (getUrl == undefined) {
                if (responseData.APICount[0].APICount == 0) {
                    $scope.noSearchFound = false;
                    $scope.noDataFound = true;
                } else {
                    $scope.noSearchFound = true;
                    $scope.noRecordFound = true;
                    $scope.noDataFound = false;
                }
            } else {
                if (responseData.APICount[0].APICount == 0) {
                    $scope.noDataFound = true;
                    $scope.noRecordFound = false;
                } else {
                    $scope.noDataFound = false;
                    $scope.noRecordFound = true;
                }
            }
            $scope.countedRecords = responseData.APICount[0].APICount;
            $scope.numberOfPatient = Math.ceil($scope.countedRecords / $scope.itemPerPage);
            $scope.allClientList = responseData.APIData;
            $scope.allClientList = angular.copy(responseData.APIData);
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
    $scope.searchClientList = function (start, end, searchVal, allClients) {
        var startTemp = start;
        var endTemp = end;
        $scope.startAll = "";
        $scope.endAll = "";
        if (startTemp) {
            var d = new Date(startTemp);
            $scope.startAll = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }
        if (endTemp) {
            var d = new Date(endTemp);
            $scope.endAll = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }
        $scope.searchTrimData = (searchVal) ? searchVal : '';
        if (angular.isUndefined(allClients)) {
            var allClients = '';
        }
        var url = 'common/data?id=GetPatientsDatabySearch&patientId=0&PageNumber=1&PageSize=' + $scope.itemPerPage + "&SearchKeyword=" + $scope.searchTrimData + "&dbName=" + $scope.currentDBAsParam + "&FDate=" + $scope.startAll + "&TDate=" + $scope.endAll + "&Filter1=" + allClients;
        $scope.getClientList(url);
    }
    /*end  search*/
    /* New Page In Pagination*/
    $scope.getNewPageData = function (pageIndexNumber, start, end) {
        // $scope.loader = true;
        $scope.currentPage = pageIndexNumber;
        $scope.start = start;
        $scope.end = end;
        if (angular.isUndefined($scope.searchTrimData || $scope.start || $scope.end)) {
            $scope.searchTrimData = '';
            $scope.start = '';
            $scope.end = '';
        }
        var url = 'common/data?id=GetPatientsDatabySearch&patientId=0' + "&PageNumber=" + $scope.currentPage + '&PageSize=' + $scope.itemPerPage + "&SearchKeyword=" + $scope.searchTrimData + "&dbName=" + $scope.currentDBAsParam + "&FDate=" + $scope.start + "&TDate=" + $scope.end + "&Filter1=" + $scope.allClients;
        // window.history.replaceState("", "", "/#/clinical/" + $scope.currentDB + "/" + $scope.clientType + "/" + $scope.currentPage);
        $scope.getClientList(url);
    }
    /* Show User*/
    $scope.showUser = function (id) {
        $location.path("/clinical/userDetail/Client Clinical Summary Profile/Client Profile/" + id);
    }
    $scope.initPhysicianAllClients = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=GetPatientPhysician&IsActive=-1&Dbname=' + $scope.currentDBAsParam,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.dropDownPhysicianAllClients = [];

            $scope.dropDownPhysicianAllClients.push("Select Physician");
            angular.forEach(responseData, function (value, key) {
                this.push(value.PrimaryPhysician);
            }, $scope.dropDownPhysicianAllClients);
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }
});
