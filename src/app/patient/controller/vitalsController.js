app.controller('patientVitalsCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, $resource, ngTableParams, $filter) {
    $scope.patientsVitals = function (start, end, searchVitals, selectedName, selectedName1) {
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
        var Api = $resource($rootScope.apiCallVar + 'common/data/GetPatientVitals?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.patientVitalsTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'TakenByDate') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }

                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "Category": selectedName,
                    "Measurement": selectedName1,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end,
                    "SearchKeyword": searchVitals
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.vitalCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount); // recal. page nav controls
//                        if (data.APIData != "" || data.APIData.length > 0) {
//
//                            $scope.noVitalsDataFoundRoot = true;
//                            $scope.noVitalsDataFound = false;
//                            $scope.VitalsDataFound = true;
//                            return data.APIData;
//
//                        } else {
//                            $scope.noVitalsDataFoundRoot = false;
//                            $scope.noVitalsDataFound = true;
//                            $scope.VitalsDataFound = false;
//                        }
                    if (searchVitals == '' && start == '' && end == '' && selectedName == '' && selectedName1 == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noVitalsDataFoundRoot = false;
                            $scope.noVitalsDataFound = true;
                        } else {
                            $scope.noVitalsDataFoundRoot = true;
                            $scope.VitalsDataFound = true;
                            $scope.noVitalsDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noVitalsDataFound = true;
                            $scope.VitalsDataFound = false;
                        } else {
                            $scope.noVitalsDataFound = false;
                            $scope.VitalsDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });

    }
    $scope.categoryList = function () {
        //IMPLEMENT CATEGORY DROPDWN HERE
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=GetDistinctVitals&PatientId=' + $routeParams.patientId,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.category = [];
            $scope.category.push({'newcat': 'All Category'});
            angular.forEach(responseData, function (value, key) {
                this.push({'newcat': value.Category});
            }, $scope.category);
        });
    }
    $scope.measurementList = function (selectedName) {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetDistinctVitals?patientid=' + $routeParams.patientId + '&Category=' + selectedName,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.dropDown = [];
            $scope.dropDown.push("All Measurement");
            angular.forEach(responseData, function (value, key) {
                this.push(value.MeasurementTypeDesc);
            }, $scope.dropDown);
        });

    }

    $scope.patientsVitals('', '', '', '', '');
    $scope.categoryList();
    $scope.selectedName = "All Category";
    $scope.measurementList();
    $scope.selectedName1 = "All Measurement";
    $scope.chartOnVitals = function (TakenByDate, Category, MeasurementTypeDesc, event) {
        $scope.vitalTrendData = false;
        setTimeout(function () {
            $('#vitalChartPopup').show();
        }, 300);
        $scope.headerSmallVitalPopup = Category + " - " + MeasurementTypeDesc;
        $scope.chartVitaldata = [];
        $scope.loaderShow = true;
        var chartVital = $('#vitalChartPopup');
        chartVital.css('left', divPos.left);
        chartVital.css('top', divPos.top);
        chartVital.css('display', 'inline');
        if (isScrolledIntoView(chartVital) == false) {
            $('#container').height($('#container').height() + 250);
        } else {
            $('#container').height('auto');
        }
        handleScroll(chartVital);
        $scope.chartConfigVitals = {
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
                column: {
                    colorByPoint: true
                }
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
            url: $rootScope.apiCallVar + 'common/data?Id=GetPatientVitalDetailsTrend&patientID=' + $routeParams.patientId + '&Filter1=' + Category + ' - ' + MeasurementTypeDesc + '&Fdate=' + TakenByDate,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loaderShow = false;
            $scope.chartConfigVitals.series[0].data = [];
            $scope.chartConfigVitals.series[1].data = [];
            if (responseData.APICount[0].APICount == 0) {
                $scope.vitalTrendData = true;
            }

            $scope.TakenByDate = TakenByDate;
            $scope.Category = Category;
            $scope.MeasurementTypeDesc = MeasurementTypeDesc;
            if (MeasurementTypeDesc == "Blood Pressure" || MeasurementTypeDesc == "Blood Sugar" || MeasurementTypeDesc == "O2 Saturation") {
                $scope.chartConfigVitals.options.chart.type = "line";
                if (MeasurementTypeDesc == "Blood Pressure") {
                    $scope.chartConfigVitals.series[0].name = "Systolic";
                    $scope.chartConfigVitals.series[0].showInLegend = true;
                    $scope.chartConfigVitals.series[1].showInLegend = true;
                }
            } else {

                if (MeasurementTypeDesc == "Respiration") {
                    $scope.chartConfigVitals.options.colors = ['rgba(151,187,205,1)'];
                } else if (MeasurementTypeDesc == "Temperature") {
                    $scope.chartConfigVitals.options.colors = ['rgba(222,123,123,1)'];
                } else if (MeasurementTypeDesc == "Weight") {
                    $scope.chartConfigVitals.options.colors = ['rgba(253,180,92,1)'];
                } else if (MeasurementTypeDesc == "Height") {
                    $scope.chartConfigVitals.options.colors = ['rgba(79,95,111,1)'];
                } else if (MeasurementTypeDesc == "Supplements") {
                    $scope.chartConfigVitals.options.colors = ['rgba(79,95,111,1)'];
                } else if (MeasurementTypeDesc == "Urine") {
                    $scope.chartConfigVitals.options.colors = ['#ff9933'];
                } else if (MeasurementTypeDesc == "Bowel Movement") {
                    $scope.chartConfigVitals.options.colors = ['rgba(151,187,205,1)'];
                }
            }
            $scope.loaderShow = false;
            $scope.ShowIndiactor = false;
            $scope.startEndDatesSmall = [];

            angular.forEach(responseData.APIData, function (value, key) {
                if (value.Flag == -1)
                {
                    $scope.chartConfigVitals.series[0].data.push({name: $filter('date')(value.TakenByDate, "yyyy-MM-dd HH:mm:ss"), y: parseFloat(value.MeasurementOptionValue), color: 'rgba(255,0,0,1)'});
                } else
                {
                    if (MeasurementTypeDesc == "Blood Pressure") {
                        $scope.chartConfigVitals.series[1].data.push([$filter('date')(value.TakenByDate, "yyyy-MM-dd HH:mm:ss"), parseFloat(value.MeasurementOptionValue)]);
                        $scope.chartConfigVitals.series[0].data.push([$filter('date')(value.TakenByDate, "yyyy-MM-dd HH:mm:ss"), parseFloat(value.MeasurementOptionValue1)]);
                    } else {
                        $scope.chartConfigVitals.series[0].data.push([$filter('date')(value.TakenByDate, "yyyy-MM-dd HH:mm:ss"), parseFloat(value.MeasurementOptionValue)]);
                    }
                }
                $scope.startEndDatesSmall.push(value.TakenByDate);
            });
            $scope.startEndDatesSmall = jQuery.unique($scope.startEndDatesSmall);
            $scope.startSmallVitalDate = $scope.startEndDatesSmall[0];
            $scope.endSmallVitalDate = $scope.startEndDatesSmall[$scope.startEndDatesSmall.length - 1];

        }).error(function (responseData, status, headers, config) {
            $scope.loaderShow = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }
    $scope.latestTrend = function () {
        $rootScope.latestTrendShow = true;
        $('#latestTrendPopup').show();
        $scope.listOfMesurement = [];
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetDistinctVitals?patientid=' + $routeParams.patientId + '&Category=Vital Sign',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            angular.forEach(responseData, function (value, key) {
                this.push(value.MeasurementTypeDesc);
            }, $scope.listOfMesurement);
            $scope.getAllDataForVitalChart($scope.listOfMesurement);
        });
    }

    $scope.closevitalTop7Trend = function () {
        $("#latestTrendPopup").hide(500);
        $rootScope.latestTrendShow = false;
    }

    $scope.getAllDataForVitalChart = function (listOfMesurement) {
        $scope.loaderShow = true;
        var chartConfigForLatestTrend = {
            options: {
                chart: {
                    type: 'column',
                    height: 250,
                    width: 278,
                    reflow: false
                },
                exporting: {
                    enabled: false
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
                column: {
                    colorByPoint: true
                }
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
                }]
        }
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetAllMostRecentVitalsByID?patientid=' + $routeParams.patientId,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loaderShow = false;


            $scope.hexToRgba = function (hexCode) {
                var hex = hexCode.replace('#', '');
                var r = parseInt(hex.substring(0, 2), 16);
                var g = parseInt(hex.substring(2, 4), 16);
                var b = parseInt(hex.substring(4, 6), 16);
                if (hexCode == '#DCDCDC') {

                    var result = 'rgba(' + r + ',' + g + ',' + b + ',' + '1' + ')';
                } else {
                    var result = 'rgba(' + r + ',' + g + ',' + b + ',' + '0.7' + ')';
                }

                return result;
            }
            var measurementType = listOfMesurement;

            var trendData = responseData.APIData;
            $scope.ShowIndiactorForVitals = false;
            var graphsData = {};

            var colorArray = ['#DCDCDC', '#FDB45C', '#4F5F6F', '#97bbcd', '#DCDCDC', '#de7b7b', '#DCDCDC', '#FDB45C', '#4F5F6F', '#97bbcd', '#DCDCDC', '#de7b7b'];
            var i = 0;
            angular.forEach(measurementType, function (key, value) {
                chartConfigForLatestTrend.options.colors = [];
                chartConfigForLatestTrend.series[0].data = [];
                chartConfigForLatestTrend.series[1].data = [];
                chartConfigForLatestTrend.xAxis.categories = [];
                if (typeof graphsData[key] == 'undefined') {
                    graphsData[key] = {};
                }
                var getFilterData = trendData.filter(function (obj) {
                    return (key == obj.MeasurementTypeDesc);
                });
                angular.forEach(getFilterData, function (fkey, fvalue) {
                    if (fkey.MeasurementTypeDesc == "Blood Pressure" || fkey.MeasurementTypeDesc == "Blood Sugar" || fkey.MeasurementTypeDesc == "O2 Saturation") {
                        chartConfigForLatestTrend.options.chart.type = "line";
                        chartConfigForLatestTrend.options.colors.push("#97C4F0");
                        if (fkey.MeasurementTypeDesc == "Blood Pressure") {
                            chartConfigForLatestTrend.series[0].name = "Systolic";
                            chartConfigForLatestTrend.series[0].showInLegend = true;
                            chartConfigForLatestTrend.series[1].showInLegend = true;
                            chartConfigForLatestTrend.options.colors.push("#434348");
                        }
                    } else {
                        chartConfigForLatestTrend.series[0].name = "MeasurementValue";
                        chartConfigForLatestTrend.options.chart.type = "column";
                        chartConfigForLatestTrend.series[0].showInLegend = false;
                        chartConfigForLatestTrend.series[1].showInLegend = false;
                        chartConfigForLatestTrend.options.colors.push(colorArray[i]);
                    }

                    if (fkey.Flag == -1) {
                        chartConfigForLatestTrend.series[0].data.push({name: $filter('date')(fkey.TakenByDate, "yyyy-MM-dd HH:mm:ss"), y: parseFloat(fkey.MeasurementOptionValue), color: 'rgba(255,0,0,1)'});
                    } else {
                        if (fkey.MeasurementTypeDesc == "Blood Pressure") {
                            chartConfigForLatestTrend.series[1].data.push([$filter('date')(fkey.TakenByDate, "yyyy-MM-dd HH:mm:ss"), parseFloat(fkey.MeasurementOptionValue)]);
                            chartConfigForLatestTrend.series[0].data.push([$filter('date')(fkey.TakenByDate, "yyyy-MM-dd HH:mm:ss"), parseFloat(fkey.MeasurementOptionValue1)]);

                        } else {
                            if (fkey.MeasurementTypeDesc == "Blood Sugar" || fkey.MeasurementTypeDesc == "O2 Saturation") {
                                chartConfigForLatestTrend.series[0].data.push([$filter('date')(fkey.TakenByDate, "yyyy-MM-dd HH:mm:ss"), parseFloat(fkey.MeasurementOptionValue1)]);
                            } else {
                                chartConfigForLatestTrend.series[0].data.push([$filter('date')(fkey.TakenByDate, "yyyy-MM-dd HH:mm:ss"), parseFloat(fkey.MeasurementOptionValue)]);
                            }
                        }

                    }
                    chartConfigForLatestTrend.xAxis.categories.push($filter('date')(fkey.TakenByDate, "yyyy-MM-dd HH:mm:ss"));
                    /*console.log($filter('date')(fkey.TakenByDate, "yyyy-MM-dd HH:mm:ss"));*/
                    graphsData[key]['isSelected'] = false;

                });

                graphsData[key]['highgrapgh'] = angular.copy(chartConfigForLatestTrend);
                i++;
            });
            $scope.graphsData = graphsData;
            console.log($scope.graphsData);
        });
    }
    $scope.removeAllSelectedChart = function () {
        angular.forEach($scope.graphsData, function (item, key) {
            //$scope.$apply(function(){
            $scope.graphsData[key]['isSelected'] = false;
            $scope.graphsData[key]['highgrapgh'].xAxis.labels = {enabled: false};
            $scope.graphsData[key]['highgrapgh'].options.chart.height = 250;
            $scope.graphsData[key]['highgrapgh'].options.chart.width = 278;

        });
    }

    $scope.zoomVitalsLine = function (key) {
        $scope.removeAllSelectedChart();
        $('#latestTrendPopup .modal-body').animate({scrollTop: 0}, 'slow');
        $scope.graphsData[key]['isSelected'] = true;
        $scope.graphsData[key]['highgrapgh'].xAxis.labels = {
            enabled: true
        };
        $scope.graphsData[key]['highgrapgh'].options.chart.height = 300;
        $scope.graphsData[key]['highgrapgh'].options.chart.width = 900;
        /*$scope.graphsData[key]['optionsVitals'].showXlable = true;*/
    }

    $scope.zoomVitalsLineClose = function () {
        $("#zoomModal").hide(500);
        $rootScope.ZoomPopUp = false;
    }

})
