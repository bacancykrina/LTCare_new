app.controller('patientOrdersCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, $resource, ngTableParams) {
    $scope.orders = function (start, end, searchOrders, selectedOrderType) {
        $scope.loader = true;
        $scope.start = start;
        $scope.end = end;
        var start = end = "";
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
        var Api = $resource($rootScope.apiCallVar + 'common/data/PatientOrder?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.patientOrdersTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "OrderStartDate_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'OrderStartDate') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }

                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "Filter1": selectedOrderType,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end,
                    "SearchKeyword": searchOrders
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.orderCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount); // recal. page nav controls
                    if (searchOrders == '' && start == '' && end == '' && selectedOrderType == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientOrderDataFoundRoot = false;
                            $scope.noPatientOrderDataFound = true;
                        } else {
                            $scope.noPatientOrderDataFoundRoot = true;
                            $scope.PatientOrderDataFound = true;
                            $scope.noPatientOrderDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientOrderDataFound = true;
                            $scope.PatientOrderDataFound = false;
                        } else {
                            $scope.noPatientOrderDataFound = false;
                            $scope.PatientOrderDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });

        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetDistinctOrderType?patientid=' + $routeParams.patientId,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.OrderDropdown = [];

            $scope.OrderDropdown.push("All OrderType");
            angular.forEach(responseData, function (value, key) {
                this.push(value.OrderType);
            }, $scope.OrderDropdown);
        });
    }
    $scope.orders('', '', '', '');
    $scope.selectedOrderType = "All OrderType";
    $scope.mouseOverModal = function (oderDescptionModal) {
        if (!$scope.flag) {
            $scope.displayOrderDetails = oderDescptionModal;
            $rootScope.orderPopUp = true;
            $('#orderModal').show();
            localStorage.setItem('OrderDetailsData', JSON.stringify(oderDescptionModal));
        } else {
            $scope.displayOrderDetails = oderDescptionModal;
            $rootScope.orderPopUp = true;
            $('#orderModal').show();
            localStorage.setItem('OrderDetailsData', JSON.stringify(oderDescptionModal));
        }
    };
    $scope.oderDescptionModal = function (oderDescptionModal) {
        $scope.flag = true;
        $scope.displayOrderDetails = oderDescptionModal;
        $rootScope.orderPopUp = true;
        $('#orderModal').show();
        localStorage.setItem('OrderDetailsData', JSON.stringify(oderDescptionModal));
    };
    $scope.mouseClosePopup = function () {
        if (!$scope.flag) {
            $("#orderModal").hide(500);
            $rootScope.orderPopUp = false;
        }
    }
    $scope.closeOrderPopup = function () {
        $scope.flag = false;
        $("#orderModal").hide(500);
        $rootScope.orderPopUp = false;
    }

})

