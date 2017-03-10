app.controller('refundCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, NgTableParams, $resource) {

    $scope.refundDetails = function (startRefund, endRefund, searchRefundPatient) {
        $scope.loader = true;
         $scope.start = startRefund;
        $scope.end = endRefund;
        var startRefund = endRefund = "";
        if ($scope.start) {
            var d = new Date($scope.start);
            startRefund = [(((d.getMonth() + 1) < 10) ?
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
            endRefund = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }

        var refundDetailsApi = $resource($rootScope.apiCallVar + 'common/data/GetFinRefund?patientID=' + $routeParams.id, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }
        });

        $scope.refundDetailsDataTableConfig = new NgTableParams({
            page: 1,
            count: 25
        }, {
            getData: function (params) {
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
                    "SearchKeyword": searchRefundPatient,
                    "Fdate": startRefund,
                    "Tdate": endRefund
                };
                return refundDetailsApi.get(tempUrlObj1).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.refundCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount);
                    if (data.APIData != "" || data.APIData.length > 0) {
                        $scope.noRefundDetailsFound = false;
                        $scope.RefundDetailsFound = true;
                        return data.APIData;
                    } else {
                        $scope.noRefundDetailsFound = true;
                        $scope.RefundDetailsFound = false;
                    }
                });
            }
        });
    }
    $scope.refundDetails('','','');
});