app.controller('writeOffCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, NgTableParams, $resource) {

    $scope.writeOff = function (startWriteOff, endWriteOff, searchWriteOffPatient) {
        $scope.loader = true;
        $scope.start = startWriteOff;
        $scope.end = endWriteOff;
        var startWriteOff = endWriteOff = "";
        if ($scope.start) {
            var d = new Date($scope.start);
            startWriteOff = [(((d.getMonth() + 1) < 10) ?
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
            endWriteOff = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }

        var writeOffApi = $resource($rootScope.apiCallVar + 'common/data/GetFinWriteOff?patientID=' + $routeParams.id, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }
        });

        $scope.writeOffDataTableConfig = new NgTableParams({
            page: 1,
            count: 25
        }, {
            getData: function (params) {
                $rootScope.loaderShow = true;
                var orgObj1 = params.url();
                var sortingVar = "CashReceiptDate_desc";
                if (Object.keys(orgObj1)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj1)[2]).replace('sorting[', '').replace(']', '');

                    if (fieldName != 'CashReceiptDate') {
                        sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                    }
                }

                var tempUrlObj1 = {
                    "PageNumber": orgObj1.page,
                    "PageSize": orgObj1.count,
                    "sorting": sortingVar,
                    "SearchKeyword": searchWriteOffPatient,
                    "Fdate": startWriteOff,
                    "Tdate": endWriteOff
                };
                return writeOffApi.get(tempUrlObj1).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.writeOffCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount);
                    if (data.APIData != "" || data.APIData.length > 0) {
                        $scope.noWriteOffFound = false;
                        $scope.WriteOffFound = true;
                        return data.APIData;
                    } else {
                        $scope.noWriteOffFound = true;
                        $scope.WriteOffFound = false;
                    }
                });
            }
        });
    }
    $scope.writeOff('', '', '');
});