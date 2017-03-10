app.controller('reportCtrl', function ($scope, $rootScope) {


    $scope.reportChart = function () {
        $scope.reportChartConfig = {
            options: {
                chart: {
                    type: 'area'
                },
                colors: ['#CB89F1', '#F9C7AF']
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
                        return this.value;
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
                    name: 'Quality of Service',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }, {
                    name: 'Would Recommend Our Service',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }]
        };
    }

    $scope.pieChart = function () {
        $scope.pieReportConfig = {
            options: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                colors : ['#6C797E', '#59C2E6', '#46BE8A', '#4F5F6F', '#FDB45D']
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
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                            name: 'Health Magazin',
                            y: 18
                        }, {
                            name: 'Laboratory',
                            y: 40,
                            sliced: true,
                            selected: true
                        }, {
                            name: 'Pharmacy',
                            y: 10
                        }, {
                            name: 'Fitness Training',
                            y: 20
                        }, {
                            name: 'Equipments',
                            y: 12
                        }]
                }]
        }
    }
}); 