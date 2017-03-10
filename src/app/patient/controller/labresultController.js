app.controller('labResultCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, $resource, ngTableParams, $filter) {
    $scope.labResults = function (start, end, searchLabResult, selectedFlag) {
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
        var Api = $resource($rootScope.apiCallVar + 'common/data/GetPatientLabResults?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.labResultTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "OrderDatetime_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'OrderDatetime') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }

                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "Filter1": selectedFlag,
                    "Fdate": start,
                    "Tdate": end,
                    "SearchKeyword": searchLabResult
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;

                    $scope.labCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount); // recal. page nav controls
//                        if (data.APICount[0].APICount == 0) {
//                            $scope.noPatientLabResultsDataFoundRoot = false;
//                        } else {
//                            $scope.noPatientLabResultsDataFoundRoot = true;
//                        }
//                        if (data.APIData != "" || data.APIData.length > 0) {
//
//                            $scope.loaderShow = false;
//                            $scope.noPatientLabResultsDataFound = false;
//                            $scope.PatientLabResultsDataFound = true;
//                            return data.APIData;
//
//                        } else {
//                            $scope.loaderShow = false;
//                            $scope.noPatientLabResultsDataFound = true;
//                            $scope.PatientLabResultsDataFound = false;
//                        }
                    if (searchLabResult == '' && start == '' && end == '' && selectedFlag == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientLabResultsDataFoundRoot = false;
                            $scope.noPatientLabResultsDataFound = true;
                        } else {
                            $scope.noPatientLabResultsDataFoundRoot = true;
                            $scope.PatientLabResultsDataFound = true;
                            $scope.noPatientLabResultsDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientLabResultsDataFound = true;
                            $scope.PatientLabResultsDataFound = false;
                        } else {
                            $scope.noPatientLabResultsDataFound = false;
                            $scope.PatientLabResultsDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });

    }
    $scope.labDrpdwn = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=GetDistinctAbnormalFlag&PatientId=' + $routeParams.patientId,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.LabDropdown = [];

            $scope.LabDropdown.push("All AbnormalFlag");
            angular.forEach(responseData, function (value, key) {
                this.push(value.AbnormalFlag);
            }, $scope.LabDropdown);
        });
    }
    $scope.labResults('', '', '', '');
    $scope.selectedFlag = "All AbnormalFlag";
    $scope.lastTrendData = function (OrderDatetime, ServiceIDName, ObservationValue) {
        setTimeout(function () {
            $('#labChartPopup').show();
        }, 300);
        $scope.headerSmallLabPopup = ServiceIDName + ' - ' + ObservationValue;
        $scope.labTrendData = false;
        $scope.DataforLabchart = [];
        $scope.loader1 = true;
        var charEle = $('#labChartPopup');
        charEle.css('left', divPos.left);
        charEle.css('top', divPos.top);
        charEle.css('display', 'inline');
        if (isScrolledIntoView(charEle) == false) {
            $('#container').height($('#container').height() + 200);
        } else {
            $('#container').height('auto');
        }
        handleScroll(charEle);

        $scope.chartConfigLabResult = {
            options: {
                /* colors: ['#ff9933', '#24CBE5'],*/
                chart: {
                    type: 'column',
                    height: 300,
                    width: 375,
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
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{showInLegend: false,
                    name: 'ObservationValue',
                    data: []
                }]
        }
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?Id=GetPatientTrend&patientID=' + $routeParams.patientId + '&Fdate=' + OrderDatetime + '&Filter1=' + ServiceIDName + ' - ' + ObservationValue,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.chartConfigLabResult.series[0].data = [];
            /*$scope.chartConfigLabResult.series[0].name = [];*/

            if (responseData.APICount[0].ApiCount == 0) {
                $scope.labTrendData = true;
            }
            $scope.ServiceIDName = ServiceIDName;
            $scope.ObservationName = ObservationValue;
            $scope.labelDataforLabchart = [];
            $scope.startEndLabDates = [];
            $scope.DataforLabchart = [];
            $scope.loader1 = false;
            angular.forEach(responseData.APIData, function (value, key) {
                if (value.ObservationValue < 0) {
                    $scope.ObservationValue = (-1) * value.ObservationValue;
                } else {
                    $scope.ObservationValue = value.ObservationValue;
                }
                $scope.chartConfigLabResult.series[0].data.push([$filter('date')(value.ObservationDateTime, "yyyy-MM-dd HH:mm:ss"), parseFloat($scope.ObservationValue)]);
                $scope.startEndLabDates.push(value.ObservationDateTime);
            });
            if (ServiceIDName == "COMPLETE BLOOD COUNT (CBC)" && ObservationValue == "RBC") {
                $scope.chartConfigLabResult.options.colors = ['#ff9933'];

            } else if (ServiceIDName == "COMPLETE BLOOD COUNT (CBC)" && ObservationValue == "WBC") {
                $scope.chartConfigLabResult.options.colors = ['#24CBE5'];

            } else if (ServiceIDName == "COMPLETE BLOOD COUNT (CBC)") {
                $scope.chartConfigLabResult.options.colors = ['rgba(222,123,123,1)'];

            } else if (ServiceIDName == "TSH") {
                $scope.chartConfigLabResult.options.colors = ['rgba(220,220,220,1)'];

            } else if (ServiceIDName == "PRE-ALBUMIN") {
                $scope.chartConfigLabResult.options.colors = ['rgba(253,180,92,1)'];

            } else if (ServiceIDName == "BMP,RANDOM") {
                $scope.chartConfigLabResult.options.colors = ['#24CBE5'];

            } else if (ServiceIDName == "BMP,FASTING") {
                $scope.chartConfigLabResult.options.colors = ['rgba(79,95,111,1)'];

            } else if (ServiceIDName == "HEPATIC FUNCTION PANEL") {
                $scope.chartConfigLabResult.options.colors = ['rgba(79,95,111,1)'];

            } else if (ServiceIDName == "LIPID PANEL") {
                $scope.chartConfigLabResult.options.colors = ['rgba(220,220,220,1)'];

            } else if (ServiceIDName == "CHOLESTEROL,HDL") {
                $scope.chartConfigLabResult.options.colors = ['rgba(151,187,205,1)'];

            }
            /* $scope.labelDataforLabchart = jQuery.unique($scope.labelDataforLabchart);*/
            $scope.startEndLabDates = jQuery.unique($scope.startEndLabDates);
            $scope.startLabDate = $scope.startEndLabDates[0];
            $scope.endLabDate = $scope.startEndLabDates[$scope.startEndLabDates.length - 1];

        }).error(function (responseData, status, headers, config) {
            $scope.loader1 = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.closePopupOflastTrendData = function () {
        $("#labChartPopup").hide(500);
        $rootScope.testPopUpLast7LabTrend = false;
    }
})