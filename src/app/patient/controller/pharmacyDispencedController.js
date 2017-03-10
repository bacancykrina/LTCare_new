app.controller('pharmacyDispencedCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, $resource, ngTableParams) {
   console.log("pharmacyDispencedCtrl reporting for duty");
    $scope.dispenced = function (start, end, searchDispense) {
        $scope.loader  = true;
        $scope.start = start;
        $scope.end = end;

        if ($scope.start) {
            var d = new Date($scope.start);
            start = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }

        if ($scope.end) {
            var d = new Date($scope.end);
            end = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }
        var dispenseReportApi = $resource($rootScope.apiCallVar + 'common/data/GetDispenseReport?patientID=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.dispenseReportDataTableConfig = new ngTableParams({
            page: 1,
            count: 25
        }, {
            getData: function (params) {
                $rootScope.loaderShow = true;
                var orgObj1 = params.url();
                var sortingVar = "RxStartDate_DESC";
                if (Object.keys(orgObj1)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj1)[2]).replace('sorting[', '').replace(']', '');

                    if (fieldName != 'RxStartDate') {
                        sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                    }
                }
                var tempUrlObj1 = {
                    "PageNumber": orgObj1.page,
                    "PageSize": orgObj1.count,
                    "SearchKeyWord": searchDispense,
                    "fdate": start,
                    "Tdate": end,
                    "sorting": sortingVar
                };
                return dispenseReportApi.get(tempUrlObj1).$promise.then(function (data) {
                    $scope.loader  = false;
                    $scope.dispenseCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount);
                    if (searchDispense == '' && start == '' && end == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noClaimDetailsDataFoundRoot = false;
                            $scope.noDispenseReportFound = true;
                        } else {
                            $scope.noClaimDetailsDataFoundRoot = true;
                            $scope.DispenseReportFound = true;
                            $scope.noDispenseReportFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noDispenseReportFound = true;
                            $scope.DispenseReportFound = false;
                        } else {
                            $scope.noDispenseReportFound = false;
                            $scope.DispenseReportFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }
    $scope.dispenced('', '', '');
})