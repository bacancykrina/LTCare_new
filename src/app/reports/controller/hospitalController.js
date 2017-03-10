app.controller('hospitalCtrl', ['$scope', '$http', '$rootScope',
    function ($scope, $http, $rootScope) {
      $scope.hospitalAdmissionConfigChart = {
            options: {
                colors: ['#DCDCDC ', '#97BBCD','#fdd810'],
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
                    name: 'Inclient',
                    data: [6500, 5900, 8000, 8100, 5600, 5500, 4000]
                }, {
                    name: 'Emergency',
                    data: [2800, 4800, 4000, 1900, 8600, 2700, 9000]
                },{
                    name: 'Outclient',
                    data : [1000 ,1200 ,7800 ,1300 ,4700 ,7800 ,4500]
                }]
      }  
    }]);

app.controller('costPerClientCtrl', ['$scope', '$http', '$rootScope',
    function ($scope, $http, $rootScope) {
        $scope.costPerClientConfigChart = {
            options: {
                colors: ['#DCDCDC ', '#97BBCD'],
                chart: {
                    type: 'column'
                },
                plotOptions: {
                    series: {
                        pointWidth: 26,
                        dataLabels: {
                            enabled: false
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
                    text: ''
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
            series: [
                {
                    name : 'Knee Replacement SurgeryMy First dataset',
                    data : [6500, 5900, 8000, 8100, 5600, 5050, 4000]
                },
                {
                    name: 'Eye Care Camps',
                    data : [2800, 4800, 4000, 1900, 8600, 2700, 9000]
                }
            ]
        }
    }]);

app.controller('hospitalDeptCtrl', ['$scope', '$http', '$rootScope',
    function ($scope, $http, $rootScope) {
        $scope.hospitalDeptConfigChart = {
            options: {
                colors: ['#DCDCDC ', '#97BBCD'],
                chart: {
                    type: 'column'
                },
                plotOptions: {
                    series: {
                        pointWidth: 26,
                        dataLabels: {
                            enabled: false
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
                categories: ['2011', '2012', '2013', '2014', '2015']
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
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
            series: [
                {
                    name : 'Inclient Admissions',
                    data : [10, 25, 15, 16, 19]
                },
                {
                    name: 'Equivalent Admissions',
                    data : [35, 62, 32, 34, 42]
                }
            ]
        }
    }]);

app.controller('hospitalStaffCtrl', ["$scope", "$http", "$rootScope","$filter", 
    function ($scope, $rootScope) {
        $scope.hospitalStaffConfigChart = {
            options: {
                colors: ['#F7464A', '#46BFBD', '#FDB45C'],
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
                    useHTML: true,
                    headerFormat : ''
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Female Adults',
                    y: 56.33
                }, {
                    name: 'Senior Citizens',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Male Adults',
                    y: 10.38
                }],
            showInLegend : true
            }],
            title: {
                text: ""
            },
            
            credits: {
                enabled: false
            },
            loading: false,
            size: {
                width: ""
            },
            subtitle: {
                text: ""
            }
        };
    }]);