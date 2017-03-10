app.controller('clientCtrl', ['$scope', '$http', '$rootScope',
    function ($scope, $http, $rootScope) {
        $scope.ageWiseResidentConfigChart = {
            options: {
                colors: ['#F5888D', '#5B9BD1'],
                chart: {
                    type: 'column'
                },
                plotOptions: {
                    series: {
                        pointWidth: 26,
                        dataLabels: {
                            enabled: true
                        }
                    }
                }
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number Of Residents'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 4,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        }
        $rootScope.loaderShow = true;
        $scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + '/common/data/KPIAgeWiseResidentCount',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.ageData = responseData;
            $scope.ageResidentView = true;
            $scope.ageResidentViewFlag = false;
            if (responseData.length == 0) {
                $scope.ageResidentView = false;
                $scope.ageResidentViewFlag = true;
            }

            var tempAgeRange = [];
            var tempAgeRangeArray = [];
            angular.forEach(responseData, function (val, key) {
                if ($scope.ageWiseResidentConfigChart.xAxis.categories.indexOf(val.agerange) == -1) {
                    $scope.ageWiseResidentConfigChart.xAxis.categories.push(val.agerange);
                    tempAgeRangeArray.push(null);
                }
                if (tempAgeRange.indexOf(val.Gender) == -1) {
                    tempAgeRange.push(val.Gender);
                }
            });
            angular.forEach(responseData, function (value, key) {
                if (typeof $scope.ageWiseResidentConfigChart.series[tempAgeRange.indexOf(value.Gender)] == 'undefined') {
                    $scope.ageWiseResidentConfigChart.series[tempAgeRange.indexOf(value.Gender)] = {
                        name: value.Gender,
                        data: angular.copy(tempAgeRangeArray),
                        stack: value.agerange
                    };
                }
                var rangeIndex = angular.copy(tempAgeRange.indexOf(value.Gender));
                var ageIndex = angular.copy($scope.ageWiseResidentConfigChart.xAxis.categories.indexOf(value.agerange));
                $scope.ageWiseResidentConfigChart.series[rangeIndex].data[ageIndex] = value.Count;
            });
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
            $rootScope.loaderShow = false;
        });
    }]);
app.controller('clientSatisfactionCtrl', ['$scope', '$http', '$rootScope',
    function ($scope, $http, $rootScope) {
        $scope.clientSatisfactionConfigChart = {
            options: {
                colors: ['#DCDCDC ', '#97BBCD', '#F5888D'],
                chart: {
                    type: 'column'
                },
                plotOptions: {
                    series: {
                        pointWidth: 26,
                        dataLabels: {
                            enabled: true
                        }
                    }
                }
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number Of Residents'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 4,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                    name: 'Hospital Cleanliness',
                    data: [65, 59, 80, 81, 56, 55, 40]

                }, {
                    name: 'Client Care',
                    data: [28, 48, 40, 19, 86, 27, 90]

                }, {
                    name: 'Nursing',
                    data: [10, 12, 78, 13, 47, 78, 45]

                }],
            showInLegend: false
        }
//        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//	$scope.series = [' Hospital Cleanliness', 'Client Care','Nursing'];
//	$scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90],[10 ,12 ,78 ,13 ,47 ,78 ,45]];

        $rootScope.loaderShow = true;
        $scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + '/common/data/KPIAgeWiseResidentCount',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.ageData = responseData;
            $scope.ageResidentView = true;
            $scope.ageResidentViewFlag = false;
            if (responseData.length == 0) {
                $scope.ageResidentView = false;
                $scope.ageResidentViewFlag = true;
            }

//            var tempAgeRange = [];
//            var tempAgeRangeArray = [];
//            angular.forEach(responseData, function (val, key) {
//                if ($scope.clientSatisfactionConfigChart.xAxis.categories.indexOf(val.agerange) == -1) {
//                    $scope.clientSatisfactionConfigChart.xAxis.categories.push(val.agerange);
//                    tempAgeRangeArray.push(null);
//                }
//                if (tempAgeRange.indexOf(val.Gender) == -1) {
//                    tempAgeRange.push(val.Gender);
//                }
//            });
//
//            angular.forEach(responseData, function (value, key) {
//                if (typeof $scope.clientSatisfactionConfigChart.series[tempAgeRange.indexOf(value.Gender)] == 'undefined') {
//                    $scope.clientSatisfactionConfigChart.series[tempAgeRange.indexOf(value.Gender)] = {
//                        name: value.Gender,
//                        data: angular.copy(tempAgeRangeArray),
//                        stack: value.agerange
//                    };
//                }
//                var rangeIndex = angular.copy(tempAgeRange.indexOf(value.Gender));
//                var ageIndex = angular.copy($scope.ageWiseResidentConfigChart.xAxis.categories.indexOf(value.agerange));
//                $scope.clientSatisfactionConfigChart.series[rangeIndex].data[ageIndex] = value.Count;
//            });
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
            $rootScope.loaderShow = false;
        });
    }]);
app.controller('clientSurveyCtrl', ['$scope', '$http', '$rootScope',
    function ($scope, $http, $rootScope) {
        $scope.clientSurveyConfigChart = {
            options: {
                colors: ['#DCDCDC ', '#97BBCD'],
                chart: {
                    type: 'areaspline'
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
                categories: [
                    'January', 'February', 'March', 'April', 'May', 'June', 'July'
                ]
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
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
                    name: 'Quality of Service',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }, {
                    name: 'Would Recommend Our Service',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }]
        }
    }]);

