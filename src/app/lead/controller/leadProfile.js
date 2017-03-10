
app.controller('leadProfileCtrl', function ($scope, $resource, $q, $location, ngTableParams, $http, $rootScope, $routeParams, $window) {
    console.log("leadController");
    $scope.currentPage = 1;
    $scope.itemPerPage = 51;
    $scope.leaderBasicDeatils = function () {
        $scope.loader = true;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetLBLeadById?patientid=' + $routeParams.id,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loader = false;
            $scope.basicData = responseData.APIData[0];

        }).error(function (responseData, status, headers, config) {
            $scope.loader = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });


    }
    $scope.leaderBasicDeatils();
    $scope.leaderPatientPayers = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=GetLBPatientPayersByID&PageNumber=' + $scope.currentPage + '&PageSize=' + $scope.itemPerPage + '&patientID=' + $routeParams.id,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loaderShow = false;
            if (responseData != "" || responseData.length > 0) {
                // $scope.leadProfiledata = responseData.APIData;
                $scope.leadPayerdata = angular.copy(responseData.APIData);
            }
        }).error(function (responseData, status, headers, config) {
            $scope.loaderShow = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });


    }
    $scope.leaderPatientPayers();
    $scope.leaderPatientDiagnosis = function () {
        var Api = $resource($rootScope.apiCallVar + 'common/data?id=GetLBPatientDiagnosisByID&PageNumber=' + $scope.currentPage + '&PageSize=' + $scope.itemPerPage + '&patientID=' + $routeParams.id, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.leadDiagnosisTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {
                var orgObj = params.url();
                // ajax request to api
                //var sortingVar = "BeginDate_desc";
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
                    "PageSize": orgObj.count
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    if (data.APIData == 0) {
                        $scope.noLeadDiagnosisDataFoundRoot = true;
                        $scope.noLeadDiagnosisDataFound = true;
                        $scope.LeadDiagnosisDataFound = false;
                    } else {
                        //$scope.LeaderDiagnosisCount = data.APICount[0].APICount;
                        params.total(data.APICount[0].APICount); // recal. page nav controls
                        $scope.loaderShow = false;
                        var diagnosisDatacheck = data.APIData;

                        if (diagnosisDatacheck != undefined) {
                            $scope.leaderDiagnosisName = diagnosisDatacheck[0].PayerName;
                            $scope.noLeadDiagnosisDataFoundRoot = true;
                            $scope.noLeadDiagnosisDataFound = false;
                            $scope.LeadDiagnosisDataFound = true;
                            return data.APIData;
                        } else {
                            $scope.noLeadDiagnosisDataFoundRoot = false;
                            $scope.noLeadDiagnosisDataFound = true;
                            $scope.LeadDiagnosisDataFound = false;
                        }
                    }
                });
            }
        });
    }
    $scope.leaderPatientDiagnosis();
    $scope.newTable = function (taskId, customerProgramId) {
        $scope.loader = true;
        $scope.customerProgramId = customerProgramId;
        $scope.taskId = taskId;
        $scope.isTaskID = true;
        var Api = $resource($rootScope.apiCallVar + 'common/data?id=GetLBPatientFormDetailsByID&PageNumber=' + $scope.currentPage + '&PageSize=' + $scope.itemPerPage + '&patientID=' + $routeParams.id + '&Param1=' + $scope.customerProgramId + '&Param2=' + $scope.taskId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.leadFormDetailsTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {
                var orgObj = params.url();
                // ajax request to api
                //var sortingVar = "BeginDate_desc";
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
                    "PageSize": orgObj.count
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                     $scope.loader = false;
                    if (data.APIData == 0) {
                        $scope.noLeadFormDetailsDataFoundRoot = true;
                        $scope.noLeadFormDetailsDataFound = true;
                        $scope.LeadFormDetailsDataFound = false;
                    } else {
                        //$scope.LeaderDiagnosisCount = data.APICount[0].APICount;
                        params.total(data.APICount[0].APICount); // recal. page nav controls
                        $scope.loaderShow = false;
                        var formDetailsDatacheck = data.APIData;

                        if (formDetailsDatacheck != undefined) {
                            // $scope.leaderDetailsName = detailsDatacheck[0].PayerName;
                            $scope.noLeadFormDetailsDataFoundRoot = true;
                            $scope.noLeadFormDetailsDataFound = false;
                            $scope.LeadFormDetailsDataFound = true;

                            return data.APIData;
                        } else {
                            $scope.noLeadFormDetailsDataFoundRoot = false;
                            $scope.noLeadFormDetailsDataFound = true;
                            $scope.LeadFormDetailsDataFound = false;
                        }
                    }
                });
            }
        });
    }
    $scope.leaderAllDetails = function () {
        var Api = $resource($rootScope.apiCallVar + 'common/data?id=GetLBPatientAllDetailsByID&PageNumber=' + $scope.currentPage + '&PageSize=' + $scope.itemPerPage + '&patientID=' + $routeParams.id, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });
        $scope.leadDetailsTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                //var sortingVar = "BeginDate_desc";
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
                    "PageSize": orgObj.count
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    if (data.APIData == 0) {
                        $scope.noLeadDetailsDataFoundRoot = true;
                        $scope.noLeadDetailsDataFound = true;
                        $scope.LeadDetailsDataFound = false;
                    } else {
                        //$scope.LeaderDiagnosisCount = data.APICount[0].APICount;
                        params.total(data.APICount[0].APICount); // recal. page nav controls
                        $scope.loaderShow = false;
                        var detailsDatacheck = data.APIData;

                        if (detailsDatacheck != undefined) {
                            $scope.tasks = [];
                            $scope.combinedParamsArray = [];


                            angular.forEach(detailsDatacheck, function (value, key) {
                                this.push({'id': value.TaskId, 'label': value.CustomerProgramId});
                            }, $scope.tasks);

                            angular.forEach(data.APIData, function (value, key) {
                                $scope.combinedParams = value.AdmittedOn + value.DischargedOn + value.CareSettingname + value.Admittingreason + value.Programname + value.EligibleOn + value.EnrolledOn;
                                if ($scope.combinedParamsArray.indexOf($scope.combinedParams) == -1) {
                                    $scope.combinedParamsArray.push($scope.combinedParams);
                                } else {
                                    data.APIData[key].AdmittedOn = '';
                                    data.APIData[key].DischargedOn = '';
                                    data.APIData[key].CareSettingname = '';
                                    data.APIData[key].Admittingreason = '';
                                    data.APIData[key].Programname = '';
                                    data.APIData[key].EligibleOn = '';
                                    data.APIData[key].EnrolledOn = '';
                                }
                                //add new field '$scope.combinedParams' to APIdata 
                            });

                            $scope.noLeadDetailsDataFoundRoot = true;
                            $scope.noLeadDetailsDataFound = false;
                            $scope.LeadDetailsDataFound = true;
                            // $scope.taskId = data.APIData.TaskId;
                            //$scope.customerProgramId = data.APIData[0].CustomerProgramId;
                            return data.APIData;
                        } else {
                            $scope.noLeadDetailsDataFoundRoot = false;
                            $scope.noLeadDetailsDataFound = true;
                            $scope.LeadDetailsDataFound = false;
                        }
                    }
                });
            }
        });
    }
    $scope.leaderAllDetails();
});

