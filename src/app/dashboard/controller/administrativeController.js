app.controller('administrativeCtrl', function ($scope, $http, $rootScope, $location, NgTableParams) {
    $rootScope.srcImagePath = "http://69.18.221.129/";

    $scope.clients = function () {
        $scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/PatientCount?SearchKeyword=',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.totalClient = responseData[0].ApiCount;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPITotalClientCountByGender',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.geneder = responseData;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIFacilityAvgAgeGender',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.femaleData = responseData.APICount;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIInactiveCensus',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.APICount = responseData.Table3[0].APICount;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.activeCensus = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIActiveCensus',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.TotalCount = responseData.Table3[0].TotalCount;
            $scope.activeCensusData = [];
            $scope.grantTotal = 0;
            $scope.activeCensusData = responseData.APICount;
            $scope.malePercentage = responseData.Table2[1].Percentage;
            $scope.femalePercentage = responseData.Table2[0].Percentage;
            for (var i = 0; i < $scope.activeCensusData.length; i++) {
                $scope.activeCensusData[i].List_Output = $scope.activeCensusData[i].List_Output.replace(/[.^]/g, "\n");
                $scope.grantTotal += parseInt($scope.activeCensusData[i].TotalCount);
            }
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.inActiveCensus = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIInactiveCensus',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.APICount = responseData.Table3[0].APICount;
            $scope.chartDataType = [];
            $scope.chartDataType = responseData.APICount;
            $scope.grantTotal = 0;
            $scope.malePercentage = responseData.Table2[1].Percentage;
            $scope.femalePercentage = responseData.Table2[0].Percentage;
            for (var i = 0; i < $scope.chartDataType.length; i++) {
                $scope.chartDataType[i].List_Output = $scope.chartDataType[i].List_Output.replace(/[.^]/g, "\n");
                $scope.grantTotal += parseInt($scope.chartDataType[i].TotalCount);
            }
            $scope.chartDataType = responseData.APICount;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.censusConfig = {
        options: {
            chart: {
                type: 'areaspline',
                width: 250,
                height: 300
            },
            colors: ['#483D8B', '#85e0e0'],
            tooltip: {
                shared: true,
                headerFormat: '',
                useHTML: true,
                formatter: function () {
//                var indicator = $scope.censusData.FacilityName;
//                console.log($scope.censusData[0].FacilityName);
//                var text = '<table>';
//                var lists = $scope.censusData[$scope.censusData.findIndex(item1 => item1.FacilityName == this.y)];
//                text += '<tr>';
//                text += '<td><b>' + this.series.name + ' ' + indicator + ' : ' + this.y + '</b></td>';
//                text += '</tr>';
//                angular.forEach(lists, function (item, key) {
//                    text += '<tr>';
//                    text += '<td>' + item + '</td>';
//                    text += '</tr>';
//                });
//                text += '</table>';
//                return text;
                }
            }
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: []
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
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
                name: 'Total Census',
                data: []
            }, {
                name: 'Total Licenced Beds',
                data: []
            }]
    }

    $scope.censusChart = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=KPIDailyCensusChart',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.censusData = responseData.APIData;
            $scope.censusConfig.series[0].data = [];
            $scope.censusConfig.series[1].data = [];
            angular.forEach(responseData.APIData, function (val, key) {
                $scope.censusConfig.series[0].data.push([val.FacilityName, val.TotalCensus]);
                $scope.censusConfig.series[1].data.push([val.FacilityName, val.TotalLicenseBeds]);
                $scope.censusConfig.xAxis.categories.push(val.FacilityName);
            });
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.admission90DaysConfig = {
        options: {
            chart: {
                height: 257,
                width: 150,
                type: 'area'
            }
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
                name: 'Admission Count',
                data: []
            }]
    }

    $scope.admission90Days = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIAdmissions90Days',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.admissions90Days = responseData.Table2[0].TotalCount;
            $scope.admission90DaysConfig.series[0].data = [];
            angular.forEach(responseData.APIData, function (value, key) {
                $scope.admission90DaysConfig.series[0].data.push([value.facilityname, value.TotalCount]);
            });
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.dischargeDaysConfig = {
        options: {
            chart: {
                height: 257,
                width: 150,
                type: 'column'
            }
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                enabled: false,
                rotation: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: ''
        },
        series: [{
                name: 'Discharge Count',
                data: []
            }]
    }

    $scope.discharge90Days = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIDischarges90Days',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.discharges90Days = responseData.Table2[0].TotalCount;
            $scope.dischargeDaysConfig.series[0].data = [];
            angular.forEach(responseData.APIData, function (value, key) {
                $scope.dischargeDaysConfig.series[0].data.push([value.facilityname, value.TotalCount]);
            });
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.kpiDiagnosisMixConfig = {
        options: {
            chart: {
                height: 200,
                width: 150,
                type: 'column'
            },
            colors: ['#F1BFB4']
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0"></td>' +
                    '<td style="padding:0"><b></b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
                name: 'ICD9',
                data: []
            }]
    }

    $scope.kpiDiagnosisMix = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIDiagnosisMix',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.kpiDiagnosisMixConfig.series[0].data = [];

            angular.forEach(responseData, function (value, key) {
                $scope.kpiDiagnosisMixConfig.series[0].data.push([value.description, value.PatientCount]);
            });
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.kpiICD10Config = {
        options: {
            chart: {
                height: 200,
                width: 150,
                type: 'area'
            },
            colors: ['#E9B4F1']
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
            pointFormat: ''
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            area: {
                pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
                name: 'ICD10',
                data: []
            }]
    }

    $scope.kpiICD10 = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIDiagnosisMix2',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {

            $scope.kpiICD10Config.series[0].data = [];
            angular.forEach(responseData.APIData, function (value, key) {
                $scope.kpiICD10Config.series[0].data.push([value.ICD10, value.PatientCount]);
            });
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.userList = function () {
        $scope.listOfUser = function () {
            $location.path("/administrative/manageUser");
        }
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetUserLists',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.userList = responseData;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.top5LocationConfig = {
        options: {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 250,
                width: 500
            }
        },
        title: {
            text: ''
        },
        tooltip: {
            backgroundColor: '#EBEBEB',
            borderRadius: 10,
            borderWidth: 1,
            shared: true,
            useHTML: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer'
            }
        },
        series: [{
                name: 'Orders',
                colorByPoint: true,
                data: []
            }]
    }

    $scope.top5Location = function () {
        $scope.noTop5Location = false;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=KPITop10PatientLabOrdersAllTIme',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.labOrders = responseData;
            if($scope.labOrders == '' || $scope.labOrders == null){
                $scope.noTop5Location = true;
            }
            $scope.top5LocationConfig.series[0].data = [];
            angular.forEach(responseData, function (val, key) {
                $scope.top5LocationConfig.series[0].data.push([val.PersonLocationType, val.TotalOrdersAllTime]);
            });
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.location90DaysConfig = {
        options: {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 210,
                width: 500
            },
            colors: ['#A44AB1', '#5BBF70', '#5B8FBF', '#F86C3F', '#9458E1']
        },
        title: {
            text: ''
        },
//        tooltip: {
//            formatter: function () {
//                var index = this.series.findIndex();
//                return 'The value for <b>' + this.x + '</b> is <b>' + this.y + '</b>, in series ' + this.series[index].data;
//            }
//        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
                name: 'Location',
                colorByPoint: true,
                data: []
            }]
    }

    $scope.location90Days = function () {
        $scope.noLocationDays = false;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=KPITop10PatientLabOrdersLast30Days',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.locationOrders = responseData;
            if($scope.locationOrders == '' || $scope.locationOrders == null){
                $scope.noLocationDays = true;
            }
            $scope.location90DaysConfig.series[0].data = [];
            //$scope.location90DaysConfig.series[0].name = [];
            angular.forEach(responseData, function (value, key) {
                //this.push(value.PersonLocationType);
                $scope.location90DaysConfig.series[0].data.push([value.PersonLocationType,value.TotalOrdersInLast30Days]);
            });
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.admitLocation = function () {
        $scope.noAdmitLocationData = false;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIAdmitAllLocations',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.admitLocationData = responseData.APIData;
            if ($scope.admitLocationData == '' || $scope.admitLocationData == null) {
                $scope.noAdmitLocationData = true;
            }
            $scope.admitDataTableConfig = new NgTableParams({count: 10}, {data: responseData.APIData});
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.dischargeLocation = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIDischargeLocation',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.dischargeLocationData = responseData.APIData;
            if ($scope.dischargeLocationData == '' || $scope.dischargeLocationData == null) {
                $scope.noDischargeLocationData = true;
            }
            $scope.dischargeDataTableConfig = new NgTableParams({count: 10}, {data: responseData.APIData});
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.admitSource = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIAdmitSource',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.admit = true;
            $scope.admit1 = false;
            if (responseData.APIData.length == 0) {
                $scope.admit = false;
                $scope.admit1 = true;
            }

            $scope.tableList = [];
            angular.forEach(responseData.Table2, function (value, key) {
                value.FCount = value.FCount.split('^');
                value.FacilityAndCount = value.FacilityAndCount.split('^');
                this.push(value);
            }, $scope.tableList);
            for (var i = 0; i < $scope.tableList.length; i++) {
                $scope.tableList[i].repeatData = [];
                $scope.repeatData = $scope.tableList[i].FacilityAndCount.map(function (value, index) {
                    return {
                        data: value,
                        value: $scope.tableList[i].FCount[index]
                    }
                });
                $scope.tableList[i].repeatData = $scope.repeatData;
            }
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
            $rootScope.loaderShow = false;
        });
    }

    $scope.kpiFacilityAvgAgeGender = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIFacilityAvgAgeGender',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.femaleData = responseData.APICount;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.chartConfigPayMix = {
        options: {
            chart: {
                type: "pie",
                options3d: {
                    enabled: true,
                    alpha: 20
                }
            },
            plotOptions: {
                pie: {
                    innerSize: 50,
                    depth: 50
                }
            },
            tooltip: {
                backgroundColor: '#EBEBEB',
                borderRadius: 10,
                borderWidth: 1,
                shared: true,
                useHTML: true
            }
        },
        series: [{
                name: 'Total Patients',
                data: []
            }],
        title: {
            text: ""
        },
        credits: {
            enabled: false
        },
        loading: true,
        size: {
            width: ""
        },
        subtitle: {
            text: ""
        }
    };

    $scope.payerMix = function () {
        $scope.noPayerData = false;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIPayerMix',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.payerMixChartView = true;
            $scope.payerMixChartViewFlag = false;
            if (responseData.APIData.length == 0) {
                $scope.payerMixChartView = false;
                $scope.payerMixChartViewFlag = true;
            }

            $scope.KPIPayerMixResData = responseData.APIData;
            if ($scope.KPIPayerMixResData == '' || $scope.KPIPayerMixResData == null) {
                $scope.noPayerData = true;
            }
            var totalSum = 0;

            responseData.APIData.map(function (item) {
                totalSum += item.TotalPatientCount;
            });

            responseData.APIData = responseData.APIData.filter(function (item) {
                item['percentage'] = (item.TotalPatientCount * 100 / totalSum).toFixed(2);
                return item;
            });

            angular.forEach(responseData.APIData, function (value, key) {
                $scope.chartConfigPayMix.series[0].data.push([value.PayerTypeName + ' - ' + value.LOB + '(' + (value.SUMPer).toFixed(2) + '%)', value.TotalPatientCount]);
            });

            $scope.chartConfigPayMix.loading = false;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.chartConfigByMonth = {
        options: {
            colors: ['#71C836', '#A03FE3', '#EF822D'],
            plotOptions: {
                series: {
                    connectNulls: true
                }
            },
            tooltip: {
                headerFormat: '',
                useHTML: true,
                formatter: function () {
                    var indicator = (this.series.name == 'Census') ? '(Average)' : '(Total)';
                    var text = '<table>';
                    var lists = $scope.byMonthData[$scope.byMonthData.findIndex(item1 => item1.Count == this.y && item1.Column1 == this.series.name && item1.MonthYear == this.x)].List_Output.trim().split('^');
                    text += '<tr>';
                    text += '<td><b>' + this.series.name + ' ' + indicator + ' : ' + this.y + '</b></td>';
                    text += '</tr>';
                    angular.forEach(lists, function (item, key) {
                        text += '<tr>';
                        text += '<td>' + item + '</td>';
                        text += '</tr>';
                    });
                    text += '</table>';
                    return text;
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'Patient'
            },
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 3
        },
        series: [],
        loadding: true
    };

    $scope.byMonth = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIPatientReadmissionByMonth',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.readmissionByMonth = true;
            $scope.readmissionByMonth1 = false;
            if (responseData.length == 0) {
                $scope.readmissionByMonth = false;
                $scope.readmissionByMonth1 = true;
            }
            $scope.byMonthData = responseData.APIData;

            var tempBymonth = [];
            var tempEmptyDataArray = [];
            angular.forEach($scope.byMonthData, function (val, key) {
                if ($scope.chartConfigByMonth.xAxis.categories.indexOf(val.MonthYear) == -1) {
                    $scope.chartConfigByMonth.xAxis.categories.push(val.MonthYear);
                    tempEmptyDataArray.push(null);
                }
                if (tempBymonth.indexOf(val.Column1) == -1) {
                    tempBymonth.push(val.Column1);
                }
            });
            angular.forEach($scope.byMonthData, function (val, key) {

                var monthYearIndex = angular.copy($scope.chartConfigByMonth.xAxis.categories.indexOf(val.MonthYear));

                var columnIndex = angular.copy(tempBymonth.indexOf(val.Column1));
                if (typeof $scope.chartConfigByMonth.series[columnIndex] == 'undefined') {
                    $scope.chartConfigByMonth.series[columnIndex] = {
                        name: val.Column1,
                        data: angular.copy(tempEmptyDataArray),
                    };
                }
                $scope.chartConfigByMonth.series[columnIndex].data[monthYearIndex] = parseFloat(val.Count.toFixed(2));
            });

            $scope.chartConfigByMonth.loading = false;
        });
    }

    $scope.chartConfigReadmission = {
        options: {
            colors: ['#E939DC', '#44E939'],
            tooltip: {
                headerFormat: '',
            },
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'Ratio'
            },
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 3
        },
        series: [],
        loadding: true
    };

    $scope.readmissionByFacility = function () {
        $scope.noRatioData = false;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=KPIPatientReAdmissionRatio',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.byRatioData = responseData.APIData;
            if($scope.byRatioData == '' || $scope.byRatioData == null){
                $scope.noRatioData = true;
            }
            var tempFacilityName = [];
            var tempEmptyDataArray = [];
            angular.forEach(responseData.APIData, function (val, key) {
                if ($scope.chartConfigReadmission.xAxis.categories.indexOf(val.MonthNumber) == -1) {
                    $scope.chartConfigReadmission.xAxis.categories.push(val.MonthNumber);
                    tempEmptyDataArray.push(null);
                }
                if (tempFacilityName.indexOf(val.FacilityName) == -1) {
                    tempFacilityName.push(val.FacilityName);
                }
            });
            angular.forEach(responseData.APIData, function (val, key) {
                var monthIndex = angular.copy($scope.chartConfigReadmission.xAxis.categories.indexOf(val.MonthNumber));
                var facilityIndex = angular.copy(tempFacilityName.indexOf(val.FacilityName));

                if (typeof $scope.chartConfigReadmission.series[facilityIndex] == 'undefined') {
                    $scope.chartConfigReadmission.series[facilityIndex] = {
                        name: val.FacilityName,
                        data: angular.copy(tempEmptyDataArray)
                    };
                }
                $scope.chartConfigReadmission.series[facilityIndex].data[monthIndex] = parseFloat(val.Ratio.toFixed(2));
            });
            $scope.chartConfigReadmission.loadding = false;
        });
    }

    $scope.censusConfigRadarChart = {
        options: {
            chart: {
                polar: true,
                reflow: false,
                type: 'line'
            },
            colors: ['#F75D59', '#3090C7']
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

    $scope.censusRadarChart = function () {
        $scope.noCensusData = false;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=KPIDailyCensusChart',
            contentType: 'application/x-www-form-urlencoded',
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.censusData = responseData.APIData;
            if($scope.censusData == '' || $scope.censusData == null){
                $scope.noCensusData = true;
            }
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
            $rootScope.loaderShow = false;
        });
    }

});