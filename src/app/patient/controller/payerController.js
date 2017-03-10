app.controller('patientPayerCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, ngTableParams, $resource) {
    $scope.GetPatientPayer = function (start, end, searchPayer) {
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

        $scope.loader = true;
        var Api = $resource($rootScope.apiCallVar + 'common/data/GetPatientPayer?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }
        });
        $scope.payersTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                var sortingVar = "BeginDate_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'BeginDate') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }
                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "SearchKeyword": searchPayer,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                      $scope.loader = false;
                    if (searchPayer == '' && start == '' && end == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientPayerDataFoundRoot = false;
                            $scope.noPatientPayerDataFound = true;
                        } else {
                            $scope.noPatientPayerDataFoundRoot = true;
                            $scope.PatientPayerDataFound = true;
                            $scope.noPatientPayerDataFound = false;
                            $scope.payerCount = data.APICount[0].APICount;
                            params.total(data.APICount[0].APICount); // recal. page nav controls
                            var payersDatacheck = data.APIData;
                            $scope.dbArray = [];
                            $scope.dbArray = data.APIData.DBName;
                            $scope.m = data.APIData[0].DBName;
                            if (payersDatacheck != undefined) {
                                if (data.APIData.length != "" || data.APIData.length > 0) {
                                    $scope.DBName = [];
                                    angular.forEach(data.APIData, function (value, key) {
                                        this.push({'dbname': value.DBName});
                                    }, $scope.DBName);

                                    $scope.DBName = $scope.DBName;
                                    for (var i = 0; i <= $scope.DBName.length; i++) {
                                        if ($scope.DBName[i] != "MatrixCare") {
                                            $rootScope.pName = data.APIData[0].PayerName;
                                            $rootScope.dbPayer = $rootScope.pName;
                                        } else {
                                            $rootScope.pName = data.APIData[0].PayerName;
                                            $rootScope.dbPayer = $rootScope.pName;
                                        }
                                    }

                                    return data.APIData;
                                }
                            }
                        }
                    } else {
                        $scope.payerCount = data.APICount[0].APICount;
                        params.total(data.APICount[0].APICount); // recal. page nav controls
                        var payersDatacheck = data.APIData;
                        $scope.dbArray = [];
                        $scope.dbArray = data.APIData.DBName;
//                        $scope.m = data.APIData[0].DBName;
                        if (payersDatacheck != undefined) {
                            if (data.APIData.length != "" || data.APIData.length > 0) {
                                $scope.DBName = [];
                                angular.forEach(data.APIData, function (value, key) {
                                    this.push({'dbname': value.DBName});
                                }, $scope.DBName);
                                $scope.DBName = $scope.DBName;
                                for (var i = 0; i <= $scope.DBName.length; i++) {
                                    if ($scope.DBName[i] != "MatrixCare") {
                                        $rootScope.pName = data.APIData[0].PayerName;
                                        $rootScope.dbPayer = $rootScope.pName;
                                    } else {
                                        $rootScope.pName = data.APIData[0].PayerName;
                                        $rootScope.dbPayer = $rootScope.pName;
                                    }
                                }
                                $scope.noPatientPayerDataFound = false;
                                $scope.PatientPayerDataFound = true;
                                return data.APIData;
                            } else {
                                $scope.noPatientPayerDataFound = true;
                                $scope.PatientPayerDataFound = false;
                            }
                        }
                    }
                });
            }
        });
    }
    $scope.GetPatientPayer('', '', '');
});