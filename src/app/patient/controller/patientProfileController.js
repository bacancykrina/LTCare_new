app.controller('patientProfileCtrl', function ($scope, $location, $http, $rootScope, $routeParams, ngTableParams, $resource, $window, $filter) {
    $rootScope.fullProfile = '';
    /* Get Patient Profile Data*/
    $scope.getPatientProfileData = function () {
        $scope.loader = true;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetPatientDataById?PatientId=' + $routeParams.patientId,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $rootScope.fullProfile = responseData.APIData[0];
            $scope.loader = false;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }
    /*End Patient Profile*/
    /*Start Directive*/
    $scope.getPatientDirective = function (searchDirectives) {
        var Api = $resource($rootScope.apiCallVar + 'common/data/GetPatientDirectives?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }
        });
        $scope.directivesTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {
                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "RecentAdmitDate_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'RecentAdmitDate') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }
                if (searchDirectives == 'default') {
                    var tempUrlObj = {
                        "PageNumber": orgObj.page,
                        "PageSize": orgObj.count,
                        "sorting": sortingVar
                    };
                } else {
                    var tempUrlObj = {
                        "PageNumber": orgObj.page,
                        "PageSize": orgObj.count,
                        "SearchKeyword": searchDirectives,
                        "sorting": sortingVar
                    };
                }

                return Api.get(tempUrlObj).$promise.then(function (data) {
                    params.total(data.APICount[0].APICount); // recal. page nav controls
                    if (searchDirectives == 'default') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noDirectivesDataFoundRoot = false;
                            $scope.noDirectivesDataFound = true;
                        } else {
                            $scope.noDirectivesDataFoundRoot = true;
                            $scope.DirectivesDataFound = true;
                            $scope.noDirectivesDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noDirectivesDataFound = true;
                            $scope.DirectivesDataFound = false;
                        } else {
                            $scope.noDirectivesDataFound = false;
                            $scope.DirectivesDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }

    /*End Directive*/
    /*Start Primary Physician*/
    $scope.getPrimaryPhysician = function (searchPrimaryPhysician) {
        var Api3 = $resource($rootScope.apiCallVar + 'common/data/GetPatientPhysician?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                isArray: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.physicianTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {
                var orgObj3 = params.url();
                // ajax request to api
                var sortingVar = "PrimaryPhysician_desc";
                if (Object.keys(orgObj3)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj3)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'PrimaryPhysician') {
                        sortingVar = fieldName + "_" + orgObj3[Object.keys(orgObj3)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj3[Object.keys(orgObj3)[2]];
                    }
                }

                var tempUrlObj3 = {
                    /*"PageNumber":orgObj3.page,
                     "PageSize":orgObj3.count,*/
                    // "sorting": sortingVar
                };
                return Api3.get(tempUrlObj3).$promise.then(function (data) {
                    // params.total(data.APICount[0].APICount); // recal. page nav controls
                    if (data != "" || data > 0) {
                        $scope.nophysicianDataFoundRoot = true;
                        $scope.nophysicianDataFound = false;
                        $scope.physicianDataFound = true;
                        return data;
                    } else {
                        $scope.nophysicianDataFoundRoot = false;
                        $scope.nophysicianDataFound = true;
                        $scope.physicianDataFound = false;
                    }
                });
            }
        });
    }
    /*End Primary Physician*/

    /*Start Allergies*/
    $scope.getPatientAllergies = function (searchAllergies) {
        var Api1 = $resource($rootScope.apiCallVar + 'common/data/GetPatientAllergies?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.allergyDataTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {
                var orgObj1 = params.url();
                var sortingVar = "AllergyName_desc"
                // ajax request to api
                if (Object.keys(orgObj1)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj1)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'AllergyName') {
                        sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                    }
                }
                if (searchAllergies == 'default') {
                    var tempUrlObj1 = {
                        "PageNumber": orgObj1.page,
                        "PageSize": orgObj1.count,
                        "sorting": sortingVar
                    };
                } else {
                    var tempUrlObj1 = {
                        "PageNumber": orgObj1.page,
                        "PageSize": orgObj1.count,
                        "SearchKeyword": searchAllergies,
                        "sorting": sortingVar
                    };
                }

                return Api1.get(tempUrlObj1).$promise.then(function (data) {
                    params.total(data.APICount[0].APICount); // recal. page nav controls
                    if (searchAllergies == 'default') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noAllergiesDataFoundRoot = false;
                            $scope.noAllergiesDataFound = true;
                        } else {
                            $scope.noAllergiesDataFoundRoot = true;
                            $scope.AllergiesDataFound = true;
                            $scope.noAllergiesDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noAllergiesDataFound = true;
                            $scope.AllergiesDataFound = false;
                        } else {
                            $scope.noAllergiesDataFound = false;
                            $scope.AllergiesDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }
    /*End Allergies*/
    /*Start Most Recent Vital Signs*/
    $scope.getMostRecentVitalSigns = function (searchMostRecentVital) {
        var Api2 = $resource($rootScope.apiCallVar + 'common/data/GetMostRecentPatientVitals?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });
        $scope.RecentVitalTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {
                var orgObj2 = params.url();
                // ajax request to api
                var sortingVar = "torder";
                if (Object.keys(orgObj2)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj2)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'TakenByDate1') {
                        sortingVar = fieldName + "_" + orgObj2[Object.keys(orgObj2)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj2[Object.keys(orgObj2)[2]];
                    }
                }
                if (searchMostRecentVital == 'default') {
                    var tempUrlObj2 = {
                        "PageNumber": orgObj2.page,
                        "PageSize": orgObj2.count,
                        "sorting": sortingVar
                    };
                } else {
                    var tempUrlObj2 = {
                        "PageNumber": orgObj2.page,
                        "PageSize": orgObj2.count,
                        "SearchKeyword": searchMostRecentVital,
                        "sorting": sortingVar
                    };
                }
                return Api2.get(tempUrlObj2).$promise.then(function (data) {
                    $scope.patientMRNDatas = data.APIData;
                    params.total(data.APICount[0].APICount); // recal. page nav controls
                    if (searchMostRecentVital == 'default') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noRecentVitalDataFoundRoot = false;
                            $scope.noRecentVitalDataFound = true;
                        } else {
                            $scope.noRecentVitalDataFoundRoot = true;
                            $scope.RecentVitalDataFound = true;
                            $scope.noRecentVitalDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noRecentVitalDataFound = true;
                            $scope.RecentVitalDataFound = false;
                        } else {
                            $scope.noRecentVitalDataFound = false;
                            $scope.RecentVitalDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }
    /*End Most Recent Vital Signs*/
    /*Call ALl Functions*/
    $scope.getPatientProfileData();
    $scope.getPatientDirective('default');
    $scope.getPrimaryPhysician('default');
    $scope.getPatientAllergies('default');
    $scope.getMostRecentVitalSigns('default');
    /*Most Recent Chart*/
    $scope.vitalTop5Trend = function (recentVital) {
        $scope.loader1 = true;
        $rootScope.testPopUpmyvitalTop5Trend = true;
        $('#myvitalTop5Trend').show();
        $scope.chartConfigForVitalTop5Trend = {
            options: {
                chart: {
                    type: 'column',
                    height: 200,
                    width: 492,
                    reflow: false
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        minPointLength: 3
                    }
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [],
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                labels: {
                    enabled: false
                },
                minorTickLength: 0,
                tickLength: 0
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                    showInLegend: false,
                    name: 'MeasurementValue',
                    data: []
                },
                {
                    showInLegend: false,
                    name: 'Diastolic',
                    data: []
                }
            ]
        }

        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetTop5MostRecentVitals?patientid=' + $routeParams.patientId + '&Filter1=' + recentVital.MeasurementTypeDesc,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loader1 = false;
            var showDate = [];
            $scope.MeasurementTypeDesc = recentVital.MeasurementTypeDesc;
            if (recentVital.MeasurementTypeDesc == "Blood Pressure" || recentVital.MeasurementTypeDesc == "Blood Sugar" || recentVital.MeasurementTypeDesc == "O2 Saturation") {
                $scope.chartConfigForVitalTop5Trend.options.chart.type = "line";
                if (recentVital.MeasurementTypeDesc == "Blood Pressure") {
                    $scope.chartConfigForVitalTop5Trend.series[0].name = "Systolic";
                    $scope.chartConfigForVitalTop5Trend.series[0].showInLegend = true;
                    $scope.chartConfigForVitalTop5Trend.series[1].showInLegend = true;
                }
            } else {
                if (recentVital.MeasurementTypeDesc == "Respiration") {
                    $scope.chartConfigForVitalTop5Trend.options.colors = ['rgba(151,187,205,1)'];
                } else if (recentVital.MeasurementTypeDesc == "Temperature") {
                    $scope.chartConfigForVitalTop5Trend.options.colors = ['rgba(222,123,123,1)'];
                } else if (recentVital.MeasurementTypeDesc == "Weight") {
                    $scope.chartConfigForVitalTop5Trend.options.colors = ['rgba(253,180,92,1)'];
                } else if (recentVital.MeasurementTypeDesc == "Height") {
                    $scope.chartConfigForVitalTop5Trend.options.colors = ['rgba(79,95,111,1)'];
                } else if (recentVital.MeasurementTypeDesc == "Supplements") {
                    $scope.chartConfigForVitalTop5Trend.options.colors = ['rgba(79,95,111,1)'];
                } else if (recentVital.MeasurementTypeDesc == "Urine") {
                    $scope.chartConfigForVitalTop5Trend.options.colors = ['#ff9933'];
                } else if (recentVital.MeasurementTypeDesc == "Bowel Movement") {
                    $scope.chartConfigForVitalTop5Trend.options.colors = ['rgba(151,187,205,1)'];
                }
            }
            angular.forEach(responseData.APIData, function (value, key) {
                if (value.Flag == -1) {
                    $scope.chartConfigForVitalTop5Trend.series[0].data.push({name: $filter('date')(value.TakenByDate, "yyyy-MM-dd HH:mm:ss"), y: parseFloat(value.MeasurementOptionValue), color: 'rgba(255,0,0,1)'});
                } else {
                    if (recentVital.MeasurementTypeDesc == "Blood Pressure") {
                        $scope.chartConfigForVitalTop5Trend.series[1].data.push([$filter('date')(value.TakenByDate, "yyyy-MM-dd HH:mm:ss"), parseFloat(value.MeasurementOptionValue)]);
                        $scope.chartConfigForVitalTop5Trend.series[0].data.push([$filter('date')(value.TakenByDate, "yyyy-MM-dd HH:mm:ss"), parseFloat(value.MeasurementOptionValue1)]);
                    } else {
                        $scope.chartConfigForVitalTop5Trend.series[0].data.push([$filter('date')(value.TakenByDate, "yyyy-MM-dd HH:mm:ss"), parseFloat(value.MeasurementOptionValue)]);
                    }
                }
                showDate.push(value.TakenByDate);
            });
            $scope.startVitalDate = showDate[0];
            $scope.endVitalDate = showDate[showDate.length - 1];
            console.log($scope.chartConfigForVitalTop5Trend.series);
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }
    $scope.closePopupOfvitalTop5Trend = function () {
        $("#myvitalTop5Trend").hide(500);
        $rootScope.testPopUpmyvitalTop5Trend = false;
    }
    $scope.goToPayer = function () {
        $location.path("/clinical/userDetail/Client Clinical Summary Profile/Payers/" + $routeParams.patientId);
    };
});