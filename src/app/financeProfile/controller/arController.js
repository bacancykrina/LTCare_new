app.controller('arCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, NgTableParams, $resource) {

    $scope.AR = function (startAR, endAR, searchAR) {
        $scope.loader = true;
        $scope.start = startAR;
        $scope.end = endAR;
        var startAR = endAR = "";
        if ($scope.start) {
            var d = new Date($scope.start);
            startAR = [(((d.getMonth() + 1) < 10) ?
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
            endAR = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }

        var ARDetailsApi = $resource($rootScope.apiCallVar + 'common/data/GetFinChargeDetailsById?patientID=' + $routeParams.id, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }
        });

        $scope.ARDetailsDataTableConfig = new NgTableParams({
            page: 1,
            count: 25
        }, {
            getData: function (params) {
                var orgObj1 = params.url();
                var sortingVar = "Chargeid_desc";
                if (Object.keys(orgObj1)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj1)[2]).replace('sorting[', '').replace(']', '');

                    if (fieldName != 'Chargeid') {
                        sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                    }
                }

                var tempUrlObj1 = {
                    "PageNumber": orgObj1.page,
                    "PageSize": orgObj1.count,
                    "sorting": sortingVar,
                    "SearchKeyword": searchAR,
                    "Fdate": startAR,
                    "Tdate": endAR
                };
                return ARDetailsApi.get(tempUrlObj1).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.ARCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount);
                    if (data.APIData != "" || data.APIData.length > 0) {
                        $scope.noARDetailsFound = false;
                        $scope.ARDetailsFound = true;
                        return data.APIData;
                    } else {
                        $scope.noARDetailsFound = true;
                        $scope.ARDetailsFound = false;
                    }
                });
            }
        });
    }
    $scope.AR('', '', '');
});