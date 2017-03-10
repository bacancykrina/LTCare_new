app.controller('chargeCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, NgTableParams, $resource) {

    $scope.chargeDetails = function (startCharge, endCharge, searchCharge) {
        $scope.loader = true;
        $scope.start = startCharge;
        $scope.end = endCharge;
        var startCharge = endCharge = "";
        if ($scope.start) {
            var d = new Date($scope.start);
            startCharge = [(((d.getMonth() + 1) < 10) ?
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
            endCharge = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }
        var chargeDetailsApi = $resource($rootScope.apiCallVar + 'common/data/GetFinChargeDetailsById?patientID=' + $routeParams.id, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }
        });
        $scope.chargeDetailsDataTableConfig = new NgTableParams({
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
                    "SearchKeyword": searchCharge,
                    "Fdate": startCharge,
                    "Tdate": endCharge
                };
                return chargeDetailsApi.get(tempUrlObj1).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.chargeCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount);
                    if (data.APIData != "" || data.APIData.length > 0) {
                        $scope.nochargeDetailsFound = false;
                        $scope.chargeDetailsFound = true;
                        return data.APIData;
                    } else {
                        $scope.nochargeDetailsFound = true;
                        $scope.chargeDetailsFound = false;
                    }
                });
            }
        });
    }
    $scope.chargeDetails('', '', '');
    //Popup on click 
    $scope.flagPopUp = false;
    $scope.flag = false;
    $scope.mouseOverModal = function (detail) {
        console.log("hover==  ", $scope.flag);
        if (!$scope.flag) {
            $scope.displayFlagDetails = detail;
            $scope.flagPopUp = true;
            $('#flagModal').show();
            // localStorage.setItem('FlagDetailsData', JSON.stringify(flagsModal));
        } else {
            $scope.displayFlagDetails = detail;
            $scope.flagPopUp = true;
            $('#flagModal').show();
            //localStorage.setItem('FlagDetailsData', JSON.stringify(flagsModal));
        }
    };
    $scope.flagsModal = function (flagsModal) {
        $scope.flag = true;
        $scope.displayFlagDetails = flagsModal;
        $scope.flagPopUp = true;
        console.log("open");
        $('#flagModal').show();
        //localStorage.setItem('FlagDetailsData', JSON.stringify(flagsModal));
    };
    $scope.flagClosePopup = function () {
        $scope.flag = false;
        $("#flagModal").hide(500);
        $scope.flagPopUp = false;
        console.log("called");
    };
    $scope.closeHoverPopup = function () {
        if (!$scope.flag) {
            $("#flagModal").hide(500);
            $scope.flagPopUp = false;
        }
    }

    //end of popup
});