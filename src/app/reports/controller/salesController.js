app.controller('salesCtrl', ["$scope", "$http", "$rootScope","$filter", 
    function ($scope, $rootScope) {
        $scope.salesConfigChart = {
            options: {
                colors: ['#6C797E', '#59C2E6', '#46BE8A', '#4F5F6F', '#FDB45D'],
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
                name: '',
                colorByPoint: true,
                data: [{
                    name: 'Health Magazin',
                    y: 18
                }, {
                    name: 'Laboratory',
                    y: 40
                }, {
                    name: 'Pharmacy',
                    y: 10
                },{
                    name: 'Fitness Training',
                    y: 20
                },{
                    name: 'Equipments',
                    y: 12
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

app.controller('healthCampaignCtrl', ["$scope", "$http", "$rootScope","$filter", 
    function ($scope, $rootScope) {
        $scope.healthCampaignConfigChart = {
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
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
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
                    name : 'Dental Care',
                    data : [10, 15, 35, 25, 40, 35, 45],
                    pointWidth: 35
                },
                {
                    name: 'Eye Care',
                    data : [20, 35, 40, 45, 60, 75, 85],
                    pointWidth: 35
                }
            ]
        }
    }]);