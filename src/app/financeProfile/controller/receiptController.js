app.controller('receiptsCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, NgTableParams, $resource) {

    $scope.cashDetails = function (startCash, endCash, searchCashPatient) {
        $scope.loader = true;
        $scope.start = startCash;
        $scope.end = endCash;
        var startCash = endCash = "";
        if ($scope.start) {
            var d = new Date($scope.start);
            startCash = [(((d.getMonth() + 1) < 10) ?
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
            endCash = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }

        var cashDetailsApi = $resource($rootScope.apiCallVar + 'common/data/GetFinCashReceipt?patientID=' + $routeParams.id, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }
        });

        $scope.cashDetailsDataTableConfig = new NgTableParams({
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
                    "SearchKeyword": searchCashPatient,
                    "Fdate": startCash,
                    "Tdate": endCash
                };
                return cashDetailsApi.get(tempUrlObj1).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.cashCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount);
                    if (data.APIData != "" || data.APIData.length > 0) {
                        $rootScope.loaderShow = false;
                        $scope.noCashDetailsFound = false;
                        $scope.CashDetailsFound = true;
                        return data.APIData;

                    } else {
                        $rootScope.loaderShow = false;
                        $scope.noCashDetailsFound = true;
                        $scope.CashDetailsFound = false;
                    }
                });
            }
        });
    }
    $scope.cashDetails('', '', '');
});