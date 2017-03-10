app.controller('censusCtrl', function ($scope, $rootScope, $http, $filter, $resource, NgTableParams, $location) {
    console.log('censusCtrl is null reporting for duty');

    $scope.showFlag = true;
//    $scope.startCensus = '';
//    $scope.startCensus = moment();

    $scope.censusList = function () {
        $scope.loader = true;
        var censusApi = $resource($rootScope.apiCallVar + 'common/data/GetDailyCensusSummary?Fdate=', {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }
        });

        $scope.censusDataTableConfig = new NgTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {
                var orgObj1 = params.url();
                var tempUrlObj1 = {
                };
                return censusApi.get(tempUrlObj1).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.tabFacilityArray = [];
                    angular.forEach(data.APICount, function (val, key) {
                        this.push(val);
                    }, $scope.tabFacilityArray);
                    $scope.currentFacility = $scope.tabFacilityArray[0].FacilityID;
                    if ($scope.tabFacilityArray[0].FacilityID = '0') {
                        $scope.censusChart();
                    }
                   params.total(data.APICount[0].APICount); // recal. page nav controls
                    $scope.censusTableData = data.APICount;
                    $scope.dateOfCensus1 = data.APIData[0].FilterDate;
                    $scope.dateOfCensus = $filter('date')($scope.dateOfCensus1, "yyyy-MM-dd HH:mm:ss");
                    var censusData = data.APIData;
                    if (censusData.length == 0) {
                        $scope.showFlag = false;
                        $scope.noCensusDataFound = true;
                        $scope.censusDataFound = false;
                    } else {
                        $scope.combinedParamsArrayCensus = [];
                        angular.forEach(data.APIData, function (value, key) {
                            $scope.combinedParamsCensus = value.FacilityName;
                            if ($scope.combinedParamsArrayCensus.indexOf($scope.combinedParamsCensus) == -1) {
                                $scope.combinedParamsArrayCensus.push($scope.combinedParamsCensus);
                            } else {
                                data.APIData[key].FacilityName = '';
                            }
                        });
//                            $scope.noCensusDataFoundRoot = true;
                        $scope.noCensusDataFound = false;
                        $scope.censusDataFound = true;
                        $scope.showFlag = true;
                        $scope.censusMessage = data.APIData[0].Message;
                    }
                    return data.APIData;

                });
            }
        });
    }

    $scope.censusConfigRadarChart = {
        options: {
            chart: {
                polar: true,
                reflow: false,
                type: 'line'
            }
        },
        title: {
            text: '',
            x: -80
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: [],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },
        series: [{
                name: 'Total Census',
                data: [],
                pointPlacement: 'on'
            }, {
                name: 'Total Licenced Beds',
                data: [],
                pointPlacement: 'on'
            }]
    };

    $scope.censusChart = function () {
        $scope.loader = true;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=KPIDailyCensusChart',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loader= false;
            $scope.censusConfigRadarChart.series[0].data = [];
            $scope.censusConfigRadarChart.series[1].data = [];

            angular.forEach(responseData.APIData, function (val, key) {
                $scope.censusConfigRadarChart.series[0].data.push([val.FacilityName, val.TotalCensus]);
                $scope.censusConfigRadarChart.series[1].data.push([val.FacilityName, val.TotalLicenseBeds]);
                $scope.censusConfigRadarChart.xAxis.categories.push(val.FacilityName);
            });
            $scope.censusMessage = responseData.APIData[0].Message;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
            $scope.loader = false;
        });
    }

    $scope.selectedFacility = function (currentFacility, startCensus) {
        $scope.loader = true;
        $scope.startCensus = '';
        $scope.selectedFacilityValue = currentFacility;
        $scope.start = startCensus;
        var start = "";
        if ($scope.start) {``
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

        if (typeof currentFacility == 'undefined') {
            currentFacility = '';
        }
        var censusApi = $resource($rootScope.apiCallVar + 'common/data/GetDailyCensusSummary?Filter1=' + currentFacility + '&Fdate=' + start, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }
        });

        $scope.censusDataTableConfig = new NgTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {
                var orgObj1 = params.url();
                var tempUrlObj1 = {
                };
                return censusApi.get(tempUrlObj1).$promise.then(function (data) {
                    $scope.loader = false;  
                    $scope.dateOfCensus1 = startCensus;
                    $scope.dateOfCensus = $filter('date')($scope.dateOfCensus1, "yyyy-MM-dd HH:mm:ss");
                    params.total(data.APICount[0].APICount); // recal. page nav controls
                    var censusData = data.APIData;
                    if (censusData.length == 0) {
                        $scope.showFlag = false;
                        $scope.noCensusDataFound = true;
                        $scope.censusDataFound = false;
                    } else {
                        $scope.combinedParamsArrayCensus = [];
                        angular.forEach(data.APIData, function (value, key) {
                            $scope.combinedParamsCensus = value.FacilityName;
                            if ($scope.combinedParamsArrayCensus.indexOf($scope.combinedParamsCensus) == -1) {
                                $scope.combinedParamsArrayCensus.push($scope.combinedParamsCensus);
                            } else {
                                data.APIData[key].FacilityName = '';
                            }
                        });
//                            $scope.noCensusDataFoundRoot = true;
                        $scope.noCensusDataFound = false;
                        $scope.censusDataFound = true;
                        $scope.showFlag = true;
                        $scope.censusMessage = data.APIData[0].Message;
                        switch ($scope.selectedFacilityValue) {
                            case 0:
                                //$scope.censusChart();
                                break;
                            case 11:
                                $scope.updateBarChartInCensus(data);
                                break;
                            case 12:
                                $scope.updateLineCensusChart(data);
                                break;
                            case 14:
                                $scope.updateFor14CensusChart(data);
                                break;
                            case 15:
                                //$scope.updateFor14CensusChart(data);
                                break;
                            case 16:
                                $scope.updateChartFor16Census(data);
                                break;
                            case 17:
                                $scope.updateChartFor17Census(data);
                                break;
                            case 18:
                                $scope.updateChartFor18Census(data);
                                break;
                            case 20:
                                $scope.updateChartFor20Census(data);
                                break;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }

    $scope.selectedFacility(0, null);

    $scope.chartConfig11Census = {
        options: {
            colors: ['#ff9933', '#24CBE5'],
            chart: {
                type: 'bar',
                reflow: false,
                width: 800
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
                name: 'Total Census',
                data: []
            }, {
                name: 'Total License Beds',
                data: []
            }]
    }
    //filter 11 chart started
    $scope.updateBarChartInCensus = function (data) {
        $scope.chartConfig11Census.series[0].data = [];
        $scope.chartConfig11Census.series[1].data = [];
        $scope.chartConfig11Census.xAxis.categories = [];

        angular.forEach(data.APIData, function (val, key) {
            $scope.chartConfig11Census.series[0].data.push([val.UnitName, val.TotalCensus]);
            $scope.chartConfig11Census.series[1].data.push([val.UnitName, val.TotalLicenseBeds]);
            $scope.chartConfig11Census.xAxis.categories.push(val.UnitName);
        });
    }

    $scope.chartConfig12Census = {
        options: {
            colors: ['#ff9933', '#cdd6a1'],
            chart: {
                type: 'column',
                reflow: false,
                width: 850
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        credits: {
            enabled: false
        },
        series: [{
                name: 'Total Beds',
                maxPointWidth: 25,
                data: []
            }, {
                name: 'Total Licenced  Beds',
                maxPointWidth: 25,
                data: []
            }]
    }

    $scope.updateLineCensusChart = function (data) {
        $scope.chartConfig12Census.series[0].data = [];
        $scope.chartConfig12Census.series[1].data = [];
        $scope.chartConfig12Census.xAxis.categories = [];

        angular.forEach(data.APIData, function (val, key) {
            $scope.chartConfig12Census.series[0].data.push([val.UnitName, val.TotalCensus]);
            $scope.chartConfig12Census.series[1].data.push([val.UnitName, val.TotalLicenseBeds]);
            $scope.chartConfig12Census.xAxis.categories.push(val.UnitName);
        });
    }

    $scope.chartConfig14Census = {
        options: {
            chart: {
                reflow: false,
                type: 'bar',
                width: 850
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
                name: 'Total Beds',
                data: []
            }, {
                name: 'Total Licenced  Beds',
                data: []
            }]
    }

    //for 14 chart start
    $scope.updateFor14CensusChart = function (data) {
        $scope.chartConfig14Census.series[0].data = [];
        $scope.chartConfig14Census.series[1].data = [];
        $scope.chartConfig14Census.xAxis.categories = [];

        angular.forEach(data.APIData, function (val, key) {
            $scope.chartConfig14Census.series[0].data.push([val.UnitName, val.TotalCensus]);
            $scope.chartConfig14Census.series[1].data.push([val.UnitName, val.TotalLicenseBeds]);
            $scope.chartConfig14Census.xAxis.categories.push(val.UnitName);
        });
    }
    $scope.chartConfig16Census = {
        options: {
            chart: {
                type: 'column',
                reflow: false,
                width: 850,
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [
            ],
            crosshair: true
        },
        series: [{
                name: 'Total Beds',
                data: [],
                showInLegend: false
            }]
    }
    //16 chart start
    $scope.updateChartFor16Census = function (data) {

        $scope.chartConfig16Census.series[0].data = [];

        angular.forEach(data.APIData, function (val, key) {
            $scope.chartConfig16Census.series[0].data.push([val.UnitName, val.TotalCensus]);
            $scope.chartConfig16Census.xAxis.categories.push(val.UnitName);
        });
    }

    $scope.chartConfig17Census = {
        options: {
            colors: [' #f7dc6f ', ' #9b59b6  '],
            chart: {
                type: 'bar',
                reflow: false,
                width: 850
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
                name: 'Total Census',
                data: []
            }, {
                name: 'Total License Beds',
                data: []
            }]
    }

    //chart for 17 id start
    $scope.updateChartFor17Census = function (data) {
        $scope.chartConfig17Census.series[0].data = [];
        $scope.chartConfig17Census.series[1].data = [];
        $scope.chartConfig17Census.xAxis.categories = [];

        angular.forEach(data.APIData, function (val, key) {
            $scope.chartConfig17Census.series[0].data.push([val.UnitName, val.TotalCensus]);
            $scope.chartConfig17Census.series[1].data.push([val.UnitName, val.TotalLicenseBeds]);
            $scope.chartConfig17Census.xAxis.categories.push(val.UnitName);
        });
    }

    $scope.chartConfig18Census = {
        options: {
            chart: {
                type: 'column',
                reflow: false,
                width: 850,
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            colors: ['#ec8d78']
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [
            ],
            crosshair: true
        },
//            subtitle: {
//                text: 'Test options by dragging the sliders below'
//            },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        series: [{
                name: 'Total Beds',
                data: [],
                legend: false
            }]
    };

    $scope.updateChartFor18Census = function (data) {
        $scope.chartConfig18Census.series[0].data = [];

        angular.forEach(data.APIData, function (val, key) {
            $scope.chartConfig18Census.series[0].data.push([val.FacilUnitNameityName, val.TotalCensus]);
            $scope.chartConfig18Census.xAxis.categories.push(val.UnitName);
        });
    };

    $scope.chartConfigFor20Census = {
        chart: {
            type: 'pie',
            reflow: false,
            width: 850,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        xAxis: {
            categories: [
            ],
            crosshair: true
        },
        series: [{
                type: 'pie',
                name: 'Total Census',
                data: []
            }]
    };
    //19 chart for census start
    $scope.updateChartFor20Census = function (data) {
        $scope.chartConfigFor20Census.series[0].data = [];

        angular.forEach(data.APIData, function (val, key) {
            $scope.chartConfigFor20Census.series[0].data.push([val.UnitName, val.TotalCensus]);
            $scope.chartConfigFor20Census.xAxis.categories.push(val.UnitName);
        });
    }

});