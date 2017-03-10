app.controller('executiveCtrl', function ($scope, $location, $http, $rootScope, NgTableParams, $resource, $filter) {
    console.log('executiveCtrl reporting for duty');

    $scope.kpiActiveCensus = function () {
        $scope.loader = true;
        $scope.colorsArray = [' #85C744', ' #EFA131', '#9358AC', '#7A869C', '#2BBCE0'];
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIActiveCensus',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loader = false;
            $scope.TotalCount = responseData.Table3[0].TotalCount;
            var labelDataforBarchart = [];
            var totalDataforBarchart2 = [];
            angular.forEach(responseData.APIData, function (value, key) {
                this.push(value.facilityname);
                totalDataforBarchart2.push(value.TotalCount);
            }, labelDataforBarchart);
            // Set ToolTip start
            $scope.chartDataType = [];
            $scope.grantTotal = 0;
            $scope.chartDataType = responseData.APICount;
            $scope.malePercentage = responseData.Table2[1].Percentage;
            $scope.femalePercentage = responseData.Table2[0].Percentage;

            for (var i = 0; i < $scope.chartDataType.length; i++) {
                $scope.chartDataType[i].List_Output = $scope.chartDataType[i].List_Output.replace(/[.^]/g, "\n");
                $scope.grantTotal += parseInt($scope.chartDataType[i].TotalCount);
            }
            // Set ToolTip end

            $scope.labels = labelDataforBarchart;
            $scope.series = ['Active Census'];
            $scope.data = [totalDataforBarchart2];
            $scope.colors = [{
                    fillColor: 'rgba(148,116,153,0.7)',
                    strokeColor: 'rgba(148,116,153,0)',
                    highlightFill: 'rgba(148,116,153,1)',
                    highlightStroke: 'rgba(148,116,153,1)'
                }];
            // Chart.js Options - complete list at http://www.chartjs.org/docs/
            $scope.options = {
                maintainAspectRatio: false,
                showScale: false,
                barDatasetSpacing: 0,
                tooltipFontSize: 12,
                tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
                responsive: true,
                scaleBeginAtZero: true,
                scaleShowGridLines: false,
                scaleLineColor: "transparent",
                barShowStroke: false,
                barValueSpacing: 5,
                //barDatasetSpacing: 1
            };
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
            $scope.loader = false;
        });
    }

    $scope.kpiInactiveCensus = function () {
        $scope.loader = true;
        $scope.apiCallVar = $rootScope.apiCallVar;
        $scope.srcImagePath = $rootScope.srcImagePath;

        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIInactiveCensus',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loader = false;
            $scope.APICount = responseData.Table3[0].APICount;
            var labelData = [];
            angular.forEach(responseData.APIData, function (value, key) {
                this.push(value.facilityname);
            }, labelData);

            var valueData = [];
            angular.forEach(responseData.APIData, function (value, key) {
                this.push(parseInt(value.TotalCount));
            }, valueData);

            $scope.chartDataType = [];
            $scope.chartDataType = responseData.APICount;
            $scope.grantTotal = 0;
            $scope.malePercentage = responseData.Table2[1].Percentage;
            $scope.femalePercentage = responseData.Table2[0].Percentage;

            for (var i = 0; i < $scope.chartDataType.length; i++) {
                $scope.chartDataType[i].List_Output = $scope.chartDataType[i].List_Output.replace(/[.^]/g, "\n");
                $scope.grantTotal += parseInt($scope.chartDataType[i].TotalCount);
            }
            // Set ToolTip end

            $scope.chartDataType = responseData.APICount;

        }).error(function (responseData, status, headers, config) {
            $scope.loader = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.getPatientCount = function () {
        $scope.loader = true;
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
            $scope.loader = false;
            $scope.gender = responseData;
        }).error(function (responseData, status, headers, config) {
            $scope.loader = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.kpiPayerMix = function () {
        $scope.payerQuater = [];
        $scope.showPayerChart = true;
        $scope.payerBtn = 'View Table';

        $scope.viewTableOfPayerMix = function () {
            if ($scope.showPayerChart == true) {
                $scope.showPayerChart = false;
                $scope.payerBtn = 'View Chart';
            } else {
                $scope.payerBtn = 'View Table';
                $scope.showPayerChart = true;
            }
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
//                    formatter: function () {
//                        var $this = this;
//                        var current = $scope.KPIPayerMixResData[$scope.KPIPayerMixResData.findIndex(item => item.PayerTypeName == $this.key.split('-')[0].trim() && item.LOB == $this.key.split('-')[1].split('(')[0].trim())];
//                        var text = '<table>';
//                        text += '<tr>';
//                        text += '<td><b>' + current.PayerTypeName + ' (' + current.TotalPER + '%)' + '</b></td>';
//                        text += '</tr>';
//                        text += '<tr>';
//                        text += '<td>Total Patients: ' + current.TotalPatientCount + ' (' + current.percentage + '%)</td>';
//                        text += '</tr>';
//                        return text + '</table>';
//                    }
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

        $scope.payerMix = function (params) {
            $scope.noPayerData = false;
            $scope.chartConfigPayMix.loading = true;
            $scope.chartConfigPayMix.series[0].data = [];
            var urlparams = '';
            if (params != '') {
                urlparams = '?Fdate=' + params.FromDate + '&TDate=' + params.ToDate;
            }
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIPayerMix' + urlparams,
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
                $scope.byPayerDataTableConfig = new NgTableParams({count: 10}, {data: responseData.APIData});
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

                if (urlparams == '') {
                    $scope.payerQuater = [];
                    $scope.selectedPayer = '1';
                    angular.forEach(responseData.APICount, function (value, key) {
                        this.push(value);
                        if (new Date(value.FromDate) >= new Date() && new Date(value.ToDate) <= new Date()) {
                            $scope.selectedPayer = key + 1;
                        }
                    }, $scope.payerQuater);
                }
                $scope.chartConfigPayMix.loading = false;
            }).error(function (responseData, status, headers, config) {
                if (status == 401) {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
                } else {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
                }
            });

        };

        $scope.payerMix('');

        $scope.updatePayer = function (index) {
            index = parseInt(index) - 1;
            $scope.payerMix($scope.payerQuater[index]);
        };
    };

    $scope.kpiReadmissionByMonth = function () {
        $scope.kPIReadmissionDrpdown = [];
        $scope.selectedReadmission = '1';
        $scope.showChart = true;
        $scope.readmissionBtn = 'View Table';

        $scope.viewTableByMonth = function () {
            if ($scope.showChart == true) {
                $scope.showChart = false;
                $scope.readmissionBtn = 'View Chart';
            } else {
                $scope.readmissionBtn = 'View Table';
                $scope.showChart = true;
            }
        }

        $scope.chartConfigByMonth = {
            options: {
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
        $scope.readmission = function (params) {
            $scope.chartConfigByMonth.loading = true;
            $scope.chartConfigByMonth.series = [];
            $scope.chartConfigByMonth.xAxis.categories = [];
            var urlparams = '';
            if (params != '') {
                urlparams = '?Filter1=' + params.MatrixLOB;
            }
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIPatientReadmissionByMonth' + urlparams,
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {

                $scope.readmissionByMonth = true;
                $scope.readmissionByMonthFlag = false;
                if (responseData.APIData.length == 0) {
                    $scope.readmissionByMonth = false;
                    $scope.readmissionByMonthFlag = true;
                }
                $scope.byMonthData = responseData.APIData;

                $scope.byMonthDataTableConfig = new NgTableParams({count: 10}, {data: responseData.APIData});

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

                if ($scope.kPIReadmissionDrpdown.length == 0) {
                    $scope.kPIReadmissionDrpdown = responseData.APICount;
                }
                $scope.chartConfigByMonth.loading = false;
            });
        };

        $scope.readmission('');

        $scope.updateReaddmission = function (index) {
            index = parseInt(index) - 1;
            $scope.readmission($scope.kPIReadmissionDrpdown[index]);
        };
    }

    $scope.kpiICD10 = function () {
        $scope.quaterDropdown = [];
        $scope.selectedQuater = '1';
        $scope.updateTop10DiaGraphData = [];
        $scope.colorsArray = ['#ddb7e2', '#5b9bd1', '#e5ca99', '#5EC6E3', '#95CD70', '#9BC168', '#5B5B5B', '#b3f2f1'];
        $scope.showICDChart = true;
        $scope.icdBtn = 'View Table';

        $scope.viewTableOfICD10 = function () {
            if ($scope.showICDChart == true) {
                $scope.showICDChart = false;
                $scope.icdBtn = 'View Chart';
            } else {
                $scope.icdBtn = 'View Table';
                $scope.showICDChart = true;
            }
        }

        $scope.chartConfigforICD = {
            options: {
                chart: {
                    type: "areaspline"
                },
                plotOptions: {
                    series: {
                        "stacking": ""
                    },
                    areaspline: {
                        dataLabels: {
                            enabled: true
//                            formatter: function () {
//                                var index = $scope.updateTop10DiaGraphData.findIndex(item1 => item1.Lob == this.series.name && item1.PatientCount == this.y);
//                                return $scope.updateTop10DiaGraphData[index].ICD10;
//                            }
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#EBEBEB',
                    borderColor: 'black',
                    borderRadius: 10,
                    borderWidth: 3,
                    shared: true,
                    useHTML: true,
                    formatter: function () {
                        var text = '<table>';
                        var $this = this;

                        angular.forEach($this.points, function (item, key) {
                            var index = $scope.updateTop10DiaGraphData.findIndex(item1 => item1.Lob == item.series.name && item1.PatientCount == item.y);
                            text += '<tr>';
                            text += '<td style="color:' + item.color + ';">' + $scope.updateTop10DiaGraphData[index].Lob + '</td>';
                            text += '<td>&nbsp;&nbsp;<b>' + $scope.updateTop10DiaGraphData[index].PatientCount + '<b/></td>';
                            text += '<td>&nbsp;&nbsp;<b>' + (item.y * 100 / $scope.totalSumCount[item.series.name]).toFixed(2) + '%<b/></td>';
                            text += '<td>&nbsp;&nbsp;' + $scope.updateTop10DiaGraphData[index].Diagnosis + '</td>';
                        });
                        return text + '</table>';
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Diagnosis'
                }
            },
            series: [],
            title: {
                text: "KPI Diagnosis Mix"
            },
            credits: {
                enabled: true
            },
            loading: true,
            size: {
                width: ""
            },
            subtitle: {
                text: ""
            }
        };

        $scope.updateTop10DiaGraph = function (params) {
            var urlparams = '';
            if (params != '') {
                urlparams = '?Filter1=' + params.Days;
            }
            $scope.chartConfigforICD.loading = true;
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIDiagnosisMix2' + urlparams,
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {
                $scope.loader = false;
                var labelDataforBarchart = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
                var totalDataforBarchart2 = [];
                var lobList = [];

                $scope.totalSumCount = {};
                $scope.updateTop10DiaGraphData = responseData.APIData;
                $scope.ICDDataTableConfig = new NgTableParams({count: 10}, {data: responseData.APIData});

                $scope.ICDChartView = true;
                $scope.ICDChartViewFlag = false;
                if (responseData.APIData.length == 0) {
                    $scope.ICDChartView = false;
                    $scope.ICDChartViewFlag = true;
                }
                angular.forEach(responseData.APIData, function (value, key) {
                    if (lobList.indexOf(value.Lob) == -1) {
                        lobList.push(value.Lob);
                    }
                    if (typeof $scope.totalSumCount[value.Lob] == 'undefined') {
                        $scope.totalSumCount[value.Lob] = 0;
                    } else {
                        $scope.totalSumCount[value.Lob] += value.PatientCount;
                    }
                    if (typeof totalDataforBarchart2[lobList.indexOf(value.Lob)] == 'undefined') {
                        totalDataforBarchart2[lobList.indexOf(value.Lob)] = {
                            data: [],
                            id: value.Lob,
                            type: "areaspline",
                            dashStyle: "Solid",
                            name: value.Lob,
                            color: "gray"
                        };
                    }
                    totalDataforBarchart2[lobList.indexOf(value.Lob)].data.push(value.PatientCount);
                    totalDataforBarchart2[lobList.indexOf(value.Lob)].color = $scope.colorsArray[lobList.indexOf(value.Lob)];
                });
                $scope.chartConfigforICD.series = totalDataforBarchart2;

                $scope.chartConfigforICD.loading = false;

                if (urlparams == '') {
                    $scope.quaterDropdown = [];
                    $scope.selectedQuater = '1';
                    angular.forEach(responseData.APICount, function (value, key) {
                        this.push(value);
                    }, $scope.quaterDropdown);
                }
            }).error(function (responseData, status, headers, config) {
                if (status == 401) {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
                } else {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
                }
                $scope.loader = false;
            });
        };

        $scope.updateTop10DiaGraph('');

        $scope.updateQuater = function (index) {
            index = parseInt(index) - 1;
            $scope.updateTop10DiaGraph($scope.quaterDropdown[index]);
        };
    }

    $scope.kpiReadmissionRate = function () {
        $scope.ratioDropdown = [];
        $scope.selectedRatio = '1';
        $scope.showChartForRatio = true;
        $scope.rateBtn = 'View Table';

        $scope.viewTableByRatio = function () {
            if ($scope.showChartForRatio == true) {
                $scope.showChartForRatio = false;
                $scope.rateBtn = 'View Chart';
            } else {
                $scope.rateBtn = 'View Table';
                $scope.showChartForRatio = true;
            }
        }

        $scope.chartConfigReadmission = {
            options: {
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

        $scope.readmissionRatio = function (params) {
            $scope.chartConfigReadmission.xAxis.categories = [];
            $scope.chartConfigReadmission.loadding = true;
            $scope.chartConfigReadmission.series = [];

            var urlparams = '';
            if (params != '') {
                urlparams = '?Filter1=' + params.MatrixLOB;
            }
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIPatientReAdmissionRatio' + urlparams,
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {
                $scope.ratioChartView = true;
                $scope.ratioChartViewFlag = false;
                if (responseData.APIData.length == 0) {
                    $scope.ratioChartView = false;
                    $scope.ratioChartViewFlag = true;
                }

                $scope.byRatioData = responseData.APIData;
                $scope.byRatioDataTableConfig = new NgTableParams({count: 10}, {data: responseData.APIData});

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

                if (urlparams == '') {
                    $scope.ratioDropdown = responseData.Table2;
                }
                $scope.chartConfigReadmission.loadding = false;
            });
        };

        $scope.readmissionRatio('');

        $scope.updateRatio = function (index) {
            index = parseInt(index) - 1;
            $scope.readmissionRatio($scope.ratioDropdown[index]);
        };
    }

    $scope.admittedTo = function () {
        $scope.admitSortType = 'FaciltyName';
        $scope.sortReverse = false;
        $scope.quaterDropdown = [];
        $scope.showAdmittedChart = true;
        $scope.admitBtn = 'View Table';

        $scope.viewTableOfAdmitted = function () {
            if ($scope.showAdmittedChart == true) {
                $scope.showAdmittedChart = false;
                $scope.admitBtn = 'View Chart';
            } else {
                $scope.admitBtn = 'View Table';
                $scope.showAdmittedChart = true;
            }
        }

        $scope.chartConfigAdmitted = {
            options: {
                chart: {
                    type: 'column',
                    reflow: false,
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        viewDistance: 25,
                        depth: 40
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        depth: 40
                    }
                },
                tooltip: {
                    headerFormat: '',
                },
                legend: {
                    itemWidth: 250,
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: []
            },
            subtitle: {
                text: ''
            },
            series: [],
            loading: true,
            lagend: false
        };

        $scope.getKPIAdmitData = function (params) {
            $scope.noAdmittedData = false;
            $scope.chartConfigAdmitted.loading = true;
            $scope.chartConfigAdmitted.series = [];
            $scope.chartConfigAdmitted.xAxis.categories = [];
            var urlparams = '';
            if (params != '') {
                urlparams = '?Fdate=' + params.FromDate + '&TDate=' + params.ToDate;
            }
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIAdmitAllLocations' + urlparams,
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {
                $scope.adminLocations = responseData.APIData;
                $scope.admittedDataTableConfig = new NgTableParams({count: 10}, {data: $scope.adminLocations});
                
                if($scope.adminLocations == '' || $scope.adminLocations == null){
                    $scope.noAdmittedData = true;
                }
                var tempAdmitLocation = [];
                var tempEmptyDataArray = [];
                angular.forEach($scope.adminLocations, function (val, key) {
                    if ($scope.chartConfigAdmitted.xAxis.categories.indexOf(val.FaciltyName) == -1) {
                        $scope.chartConfigAdmitted.xAxis.categories.push(val.FaciltyName);
                        tempEmptyDataArray.push(null);
                    }
                    if (tempAdmitLocation.indexOf(val.AdmitLocation) == -1) {
                        tempAdmitLocation.push(val.AdmitLocation);
                    }
                });
                angular.forEach($scope.adminLocations, function (val, key) {
                    if (typeof $scope.chartConfigAdmitted.series[tempAdmitLocation.indexOf(val.AdmitLocation)] == 'undefined') {
                        $scope.chartConfigAdmitted.series[tempAdmitLocation.indexOf(val.AdmitLocation)] = {
                            showInLegend: true,
                            name: val.AdmitLocation,
                            data: angular.copy(tempEmptyDataArray),
                            stack: 'common'
                        };
                    }
                    var facilityIndex = angular.copy($scope.chartConfigAdmitted.xAxis.categories.indexOf(val.FaciltyName));
                    $scope.chartConfigAdmitted.series[tempAdmitLocation.indexOf(val.AdmitLocation)].data[facilityIndex] = val.Admissions;
                });

                if (urlparams == '') {
                    $scope.admittedDropdown = [];
                    $scope.selectedQuater = '1';
                    angular.forEach(responseData.APICount, function (value, key) {
                        this.push(value);
                        if (new Date(value.FromDate) >= new Date() && new Date(value.ToDate) <= new Date()) {
                            $scope.selectedQuater = key + 1;
                        }
                    }, $scope.admittedDropdown);
                }
                $scope.chartConfigAdmitted.loading = false;
            }).error(function (responseData, status, headers, config) {
                if (status == 401) {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
                } else {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
                }
            });
        };

        $scope.getKPIAdmitData('');

        $scope.updateAdmitted = function (index) {
            index = parseInt(index) - 1;
            $scope.getKPIAdmitData($scope.admittedDropdown[index]);
        };
    }

    $scope.dischargeFrom = function () {
        $scope.dischargedSortType = 'FaciltyName';
        $scope.sortReverse = false;
        $scope.showDischargedChart = true;
        $scope.dischargeBtn = 'View Table';

        $scope.viewTableOfDischarged = function () {
            if ($scope.showDischargedChart == true) {
                $scope.showDischargedChart = false;
                $scope.dischargeBtn = 'View Chart';
            } else {
                $scope.dischargeBtn = 'View Table';
                $scope.showDischargedChart = true;
            }
        }

        $scope.chartConfigDischarge = {
            options: {
                chart: {
                    type: 'column',
                    reflow: false,
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        viewDistance: 25,
                        depth: 40
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        depth: 40
                    }
                },
                tooltip: {
                    headerFormat: '',
                },
                legend: {
                    itemWidth: 260,
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: []
            },
            subtitle: {
                text: ''
            },
            series: [],
            loading: true,
            lagend: false
        };

        $scope.getKPIDischargeData = function (params) {
            $scope.noDischargeData = false;
            $scope.chartConfigDischarge.loading = true;
            $scope.chartConfigDischarge.series = [];
            $scope.chartConfigDischarge.xAxis.categories = [];

            var urlparams = '';
            if (params != '') {
                urlparams = '?Fdate=' + params.FromDate + '&TDate=' + params.ToDate;
            }
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIDischargeLocation' + urlparams,
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {
                $scope.dischargeLocations = responseData.APIData;
                if($scope.dischargeLocations == "" || $scope.dischargeLocations == null){
                    $scope.noDischargeData = true;
                }
                $scope.dischargeDataTableConfig = new NgTableParams({count: 10}, {data: $scope.dischargeLocations});
                var tempAdmitLocation = [];
                var tempEmptyDataArray = [];
                angular.forEach($scope.dischargeLocations, function (val, key) {
                    if ($scope.chartConfigDischarge.xAxis.categories.indexOf(val.FaciltyName) == -1) {
                        $scope.chartConfigDischarge.xAxis.categories.push(val.FaciltyName);
                        tempEmptyDataArray.push(null);
                    }
                    if (tempAdmitLocation.indexOf(val.DischargeLocation) == -1) {
                        tempAdmitLocation.push(val.DischargeLocation);
                    }
                });
                angular.forEach($scope.dischargeLocations, function (val, key) {
                    if (typeof $scope.chartConfigDischarge.series[tempAdmitLocation.indexOf(val.DischargeLocation)] == 'undefined') {
                        $scope.chartConfigDischarge.series[tempAdmitLocation.indexOf(val.DischargeLocation)] = {
                            showInLegend: true,
                            name: val.DischargeLocation,
                            data: angular.copy(tempEmptyDataArray),
                            stack: 'commonDischarge'
                        };
                    }
                    var facilityIndex = angular.copy($scope.chartConfigDischarge.xAxis.categories.indexOf(val.FaciltyName));
                    $scope.chartConfigDischarge.series[tempAdmitLocation.indexOf(val.DischargeLocation)].data[facilityIndex] = val.Discharges;
                });

                if (urlparams == '') {
                    $scope.quaterDischargeDropdown = [];
                    $scope.selectedDischargeQuater = '1';
                    angular.forEach(responseData.APICount, function (value, key) {
                        this.push(value);
                        if (new Date(value.FromDate) >= new Date() && new Date(value.ToDate) <= new Date()) {
                            $scope.selectedDischargeQuater = key + 1;
                        }
                    }, $scope.quaterDischargeDropdown);
                }
                $scope.chartConfigDischarge.loading = false;
            }).error(function (responseData, status, headers, config) {
                if (status == 401) {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
                } else {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
                }
            });
        };

        $scope.getKPIDischargeData('');

        $scope.updateDischargeQuater = function (index) {
            index = parseInt(index) - 1;
            $scope.getKPIDischargeData($scope.quaterDischargeDropdown[index]);
        };
    }

    $scope.los90Days = function () {
        $scope.showLOSChart = true;
        $scope.losBtn = 'View Table';

        $scope.viewTableOfLOS = function () {
            if ($scope.showLOSChart == true) {
                $scope.showLOSChart = false;
                $scope.losBtn = 'View Chart';
            } else {
                $scope.losBtn = 'View Table';
                $scope.showLOSChart = true;
            }
        }

        $scope.chartConfigForLos = {
            options: {
                chart: {
                    type: "column"
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                tooltip: {
                    headerFormat: '',
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
                    text:'LOS Count'
                }
            },
            subtitle: {
                text: ''
            },
            series: [],
            loading: true,
        };

        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPILOSFromResidents90Days',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.LOSData = true;
            $scope.noLOSData = false;
            if (responseData.APIData.length == 0) {
                $scope.LOSData = false;
                $scope.noLOSData = true;
            }

            $scope.KPILOSResData = responseData.APIData;
            $scope.LOSDataTableConfig = new NgTableParams({count: 10}, {data: responseData.APIData});

            $scope.tableList = [];
            var tempFacilityName = [];
            var tempEmptyArray = [];
            angular.forEach(responseData.APIData, function (val, key) {
                if ($scope.chartConfigForLos.xAxis.categories.indexOf(val.LOB) == -1) {
                    $scope.chartConfigForLos.xAxis.categories.push(val.LOB);
                    tempEmptyArray.push(null);
                }
                if (tempFacilityName.indexOf(val.facilityname) == -1) {
                    tempFacilityName.push(val.facilityname);
                }
            });

            angular.forEach(responseData.APIData, function (value, key) {
                if (typeof $scope.chartConfigForLos.series[tempFacilityName.indexOf(value.facilityname)] == 'undefined') {
                    $scope.chartConfigForLos.series[tempFacilityName.indexOf(value.facilityname)] = {
                        name: value.facilityname,
                        data: angular.copy(tempEmptyArray),
                        stack: value.LOB
                    };
                }
                var facilityIndex = angular.copy(tempFacilityName.indexOf(value.facilityname));
                var lobIndex = angular.copy($scope.chartConfigForLos.xAxis.categories.indexOf(value.LOB));
                $scope.chartConfigForLos.series[facilityIndex].data[lobIndex] = value.LOSCount;
            });
            $scope.chartConfigForLos.loading = false;
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.activePaceTabs = function () {
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIAvgOfLongLOSActive',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.longLOSdata = responseData.APIData;
            $scope.paceData = responseData.Table2;
        });

        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/KPIAvgOfShortLOSActive',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.shortLOSActivedata = responseData.APIData;
        });
    }

    $scope.censusChart = function () {
        $scope.showCensusChart = true;
        $scope.censusBtn = 'View Table';

        $scope.viewTableOfCensus = function () {
            if ($scope.showCensusChart == true) {
                $scope.showCensusChart = false;
                $scope.censusBtn = 'View Chart';
            } else {
                $scope.censusBtn = 'View Table';
                $scope.showCensusChart = true;
            }
        }
        $scope.censusConfigRadarChart = {
            options: {
                chart: {
                    polar: true,
                    type: 'line'
                },
                tooltip: {
                    headerFormat: ''
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
                min: 0,
                title:{
                    text: 'Census'
                }
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

        //$scope.loader = true;
        //$scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=KPIDailyCensusChart',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.censusResData = responseData.APIData;
            if($scope.censusResData == '' || $scope.censusResData == null){
                $scope.noCensusData = true;
            }
            $scope.censusView = true;
            $scope.censusViewFlag = false;
            if (responseData.APIData.length == 0) {
                $scope.censusView = false;
                $scope.censusViewFlag = true;
            }

            $scope.censusConfigRadarChart.series[0].data = [];
            $scope.censusConfigRadarChart.series[1].data = [];

            
            $scope.censusDataTableConfig = new NgTableParams({count: 10}, {data: responseData.APIData});

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

    $scope.kpiFacilityAvgAgeGender = function () {
        //$scope.loader = true;
        //$scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));
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
});

//KPI Age Wise Resident Count chart
app.controller('ageWiseResidentChart', ['$scope', '$http', '$rootScope',
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

app.controller('diagnosisByResidentChart', ['$scope', '$http', '$rootScope','$filter',
    function ($scope, $http, $rootScope,$filter) {
        $scope.maxDate = new Date ();
        $scope.diagnosisByResidentConfigChart = {
            options: {
                colors: ['#f8906c', '#86b3f1', '#8c8785', '#fdfd59'],
                chart: {
                    type: 'column'
                },
                plotOptions: {
                    series: {
                        pointWidth: 15,
                        dataLabels: {
                            enabled: true,
                            formatter: function ()
                            {
                                var pcnt = (this.y);
                                return Highcharts.numberFormat(pcnt, 2) + '%';
                            }
                        }
                    },
                    column: {
                        colorByPoint: true
                    }

                },
                tooltip: {
                    headerFormat: ''
                },
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
                    text: 'Percentage Of Population'
                }
            },
            series: [{
                    toDateByResident : '',
                    name: 'Percentage',
                    data: [],
                    showInLegend: false
                }]
        }
        $scope.diagnosisByResident = function (params) {
            $scope.diagnosisByResidentConfigChart.loading = true;
            $scope.start = params;
            var start = "";
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
            $scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));
            var urlparams = '';
            if (params != '') {
                urlparams = '?TDate=' + start;
            }
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIDiagnosisByResident' + urlparams,
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {
                $scope.diagnosisByResidentViewFlag = false;
                $scope.diagnosisByResidentFlag = true;
                if (responseData.APIData.length == 0) {
                    $scope.diagnosisByResidentViewFlag = true;
                    $scope.diagnosisByResidentFlag = false;
                }
                $scope.diagnosisByResidentConfigChart.series[0].data = [];
                $scope.diagnosisByResidentConfigChart.series[0].toDateByResident = '';

                angular.forEach(responseData.APIData, function (val, key) {
                    $scope.diagnosisByResidentConfigChart.series[0].toDateByResident = $filter('date')(val.ToDate, "MM-dd-yyyy"); ;
                    $scope.diagnosisByResidentConfigChart.series[0].data.push([parseFloat(val.Percentage.toFixed(2))]);
                    $scope.diagnosisByResidentConfigChart.xAxis.categories.push(val.CountDiagnosis);
                });
                $scope.diagnosisByResidentConfigChart.loading = false;
            }).error(function (responseData, status, headers, config) {
                if (status == 401) {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
                } else {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
                }
                $rootScope.loaderShow = false;
            });
        }
        $scope.diagnosisByResident('');
    }]);

app.controller('activitiesOfDailyLivingWithAVGChart', ['$scope', '$http', '$rootScope','$filter',
    function ($scope, $http, $rootScope,$filter) {
        $scope.maxDate = new Date ();
        $scope.activitiesOfDailyLivingWithAVGConfigChart = {
            options: {
                colors: ['#86b3f1', '#f8906c', '#959b9c'],
                chart: {
                    type: 'column'
//                    events: {
//                    load: function () {
//                        var label = this.renderer.label("Note: One out of every five Joyce Eisenberg-Keefer Medical Center Residents have been diagnosed with three or more of the following: Atrial Fibrillation,Cebebral, Vascular Accident(and associated diagnosis), Chronic Obstructive Pulmonary Disease, Chronic Kidney Disease, Congestive Heart Failure, Coronary Heart Disease, Depression, Diabetes Mellitus or Parkinson's Disease.")
//                        .css({
//                            width: '800px',
//                            color: '#222',
//                            fontSize: '14px'
//                        })
//                        .attr({
//                            'stroke': 'silver',
//                            'stroke-width': 2,
//                            'r': 5,
//                            'padding': 10
//                        })
//                        .add();
//                        label.align(Highcharts.extend(label, {
//                            align: 'left',
//                            x: 0, // offset
//                            verticalAlign: 'bottom',
//                            y: 10 // offset
//                        }), null, '');
//                    }
//                }
                },
                plotOptions: {
                    column: {
                        colorByPoint: true
                    }
                },
                tooltip: {
                    headerFormat: '',
                }
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
                plotBands: [{// Light air
                        value: 5,
                        zIndex: 3,
                        color: 'yellow',
                        label: {
                            text: 'Moderate (5 or above)',
                            style: {
                                color: 'yellow'
                            }
                        }
                    }],
                plotLines: [{
                        color: 'yellow',
                        value: 5,
                        width: 2,
                        zIndex: 3
                    }],
                title: {
                    text: 'Number Of Activities Of Daily Living'
                }
            },
            series: [{
                    startDate : '',
                    endDate : '',
                    name: '',
                    data: [],
                    showInLegend: false
                }]
        }
        $scope.activitiesOfDailyLiving = function (startActivity, endActivity) {
           $scope.start = startActivity;
           $scope.end = endActivity;
             var start = ""; var end = "";
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
            var urlparams = '';
            if (startActivity != '' || endActivity != '') {
                urlparams = '?Fdate='+ start +'&TDate=' + end;
            }
            $scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));
            $scope.activitiesOfDailyLivingWithAVGConfigChart.loading = true;
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIActivitiesOfDailyLivingWithAVG' + urlparams,
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {
                $scope.activitiesOfDailyLivingFlag = true;
                $scope.activitiesOfDailyLivingViewFlag = false;
                if (responseData.APIData.length == 0 || responseData.APICount.Column1 == 0) {
                    $scope.activitiesOfDailyLivingFlag = false;
                    $scope.activitiesOfDailyLivingViewFlag = true;
                }
                $scope.activitiesOfDailyLivingWithAVGConfigChart.series[0].data = [];
                $scope.activitiesOfDailyLivingWithAVGConfigChart.series[0].startDate = '';
                $scope.activitiesOfDailyLivingWithAVGConfigChart.series[0].endDate = '';

                angular.forEach(responseData.APIData, function (val, key) {
                    $scope.activitiesOfDailyLivingWithAVGConfigChart.series[0].data.push([val.ADL]);
                    $scope.activitiesOfDailyLivingWithAVGConfigChart.xAxis.categories.push(val.PayerType);
                    $scope.activitiesOfDailyLivingWithAVGConfigChart.series[0].startDate =  $filter('date')(val.FromDate, "MM-dd-yyyy");
                    $scope.activitiesOfDailyLivingWithAVGConfigChart.series[0].endDate = $filter('date')(val.ToDate, "MM-dd-yyyy");

                });
                $scope.activitiesOfDailyLivingWithAVGConfigChart.loading = false;
            }).error(function (responseData, status, headers, config) {
                if (status == 401) {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
                } else {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
                }
                $rootScope.loaderShow = false;
            });
        }
        $scope.activitiesOfDailyLiving('');
    }]);

app.controller('breakdownDiagnosisByResidentChart', ['$scope', '$http', '$rootScope','$filter',
    function ($scope, $http, $rootScope,$filter) {
        $scope.maxDate = new Date ();
        $scope.breakdownDiagnosisByResidentConfigChart = {
            options: {
                colors: ['#86b3f1', '#f8906c', '#959b9c', '#eae573', '#408af0', '#4ab13a', '#2561b3', '#e16337', '#717677', '#c5c555', '#1a5488'],
                chart: {
                    type: 'column'

                },
                plotOptions: {
                    series: {
                        pointWidth: 15,
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                tooltip: {
                    headerFormat: '',
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'vertical',
                    x: 0,
                    y: 100
                }
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
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    colorByPoint: true
                }
            },
            series: []
        }
        $scope.breakdownDiagnosisByResident = function (params) {
            $scope.start = params;
            var start = "";
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
            var urlparams = '';
            if (params != '') {
                urlparams = '?TDate=' + start;
            }
            $scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));
            $scope.breakdownDiagnosisByResidentConfigChart.loading = true;
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIDiagnosisByResident' + urlparams,
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {
                $scope.toDatebreakdown = '';
                $scope.toDatebreakdown = $filter('date')(responseData.APICount[0].ToDate, "MM-dd-yyyy"); 
                $scope.breakdownDiagnosisByResidentFlag = true;
                $scope.breakdownDiagnosisByResidentViewFlag = false;
                if (responseData.APICount[0].Percentage == 0 || responseData.APICount[0].Percentage == null) {
                    $scope.breakdownDiagnosisByResidentFlag = false;
                    $scope.breakdownDiagnosisByResidentViewFlag = true;
                }
                $scope.breakdownDiagnosisByResidentConfigChart.series = [];
                $scope.breakdownDiagnosisByResidentConfigChart.xAxis.categories = [];
                $scope.breakdownData = responseData.APICount;
                var tempBrekDownDiagnosis = [];
                var tempBrekDownDiagnosisArray = [];
                angular.forEach($scope.breakdownData, function (val, key) {
                    if ($scope.breakdownDiagnosisByResidentConfigChart.xAxis.categories.indexOf(val.CountCode) == -1) {
                        $scope.breakdownDiagnosisByResidentConfigChart.xAxis.categories.push(val.CountCode);
                        tempBrekDownDiagnosisArray.push(null);
                    }
                    if (tempBrekDownDiagnosis.indexOf(val.CountCode) == -1) {
                        tempBrekDownDiagnosis.push(val.CountCode);
                    }
                });
                angular.forEach($scope.breakdownData, function (val, key) {
                    if (typeof $scope.breakdownDiagnosisByResidentConfigChart.series[tempBrekDownDiagnosis.indexOf(val.CountCode)] == 'undefined') {
                        $scope.breakdownDiagnosisByResidentConfigChart.series[tempBrekDownDiagnosis.indexOf(val.CountCode)] = {
                            showInLegend: true,
                            name: val.CountCode,
                            data: angular.copy(tempBrekDownDiagnosisArray),
                            stack: 'common'
                        };
                    }
                    var brkDownIndex = angular.copy($scope.breakdownDiagnosisByResidentConfigChart.xAxis.categories.indexOf(val.CountCode));
                    $scope.breakdownDiagnosisByResidentConfigChart.series[tempBrekDownDiagnosis.indexOf(val.CountCode)].data[brkDownIndex] = val.Percentage;
                });
                $scope.breakdownDiagnosisByResidentConfigChart.loading = false;
            }).error(function (responseData, status, headers, config) {
                if (status == 401) {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
                } else {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
                }
                $rootScope.loaderShow = false;
            });
        }
        $scope.breakdownDiagnosisByResident('');
    }]);

app.controller('AVGHospitalUsageRatesPerYearChart', ['$scope', '$http', '$rootScope','$filter',
    function ($scope, $http, $rootScope,$filter) {
        $scope.maxDate = new Date ();
        $scope.AVGHospitalUsageRatesPerYearConfigChart = {
            options: {
                colors: ['#86b3f1', '#f8906c', '#959b9c'],
                chart: {
                    type: 'column'
//                    events: {
//                    load: function () {
//                        var label = this.renderer.label("Note: One out of every five Joyce Eisenberg-Keefer Medical Center Residents have been diagnosed with three or more of the following: Atrial Fibrillation,Cebebral, Vascular Accident(and associated diagnosis), Chronic Obstructive Pulmonary Disease, Chronic Kidney Disease, Congestive Heart Failure, Coronary Heart Disease, Depression, Diabetes Mellitus or Parkinson's Disease.")
//                        .css({
//                            width: '800px',
//                            color: '#222',
//                            fontSize: '14px'
//                        })
//                        .attr({
//                            'stroke': 'silver',
//                            'stroke-width': 2,
//                            'r': 5,
//                            'padding': 10
//                        })
//                        .add();
//                        label.align(Highcharts.extend(label, {
//                            align: 'left',
//                            x: 0, // offset
//                            verticalAlign: 'bottom',
//                            y: 10 // offset
//                        }), null, '');
//                    }
//                }
                },
                plotOptions: {
                    column: {
                        colorByPoint: true
                    }
                },
                tooltip: {
                    headerFormat: '',
                },
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
                max: 35,
                plotBands: [{// Light air
                        value: 30,
                        zIndex: 3,
                        color: 'green',
                        label: {
                            text: 'National Average Of Inpatient Admissions',
                            style: {
                                color: 'green'
                            }
                        }
                    }],
                plotLines: [{
                        color: 'green',
                        value: 30,
                        width: 2,
                        zIndex: 3
                    }],
                title: {
                    text: ''
                }
            },
            series: [{
                    tostartDateAVGHospital : '',
                    toendDateAVGHospital : '',
                    name: '',
                    data: [],
                    showInLegend: false
                }]
        }
        $scope.avgUsageByRate = function (startRates,endRates) {
           $scope.start = startRates;
           $scope.end = endRates;
             var start = ""; var end = "";
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
             if(start!=''){
                start = start + ' 00:00:00.000';
            }
            if(end!=''){
                end = end + ' 23:59:00.000';
            }
            var urlparams = '';
            if (startRates != '' || endRates != '') {
                urlparams = '?Fdate='+ start +'&TDate=' + end;
            }
            $scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));
            $scope.AVGHospitalUsageRatesPerYearConfigChart.loading = true;
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIAVGHospitalUsageRatesPerYear' + urlparams,
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {
                $scope.avgHospitalRateFlag = true;
                $scope.avgHospitalRateViewFlag = false;
                if (responseData[0].Per == 0 || responseData[0].Per == null) {
                    $scope.avgHospitalRateFlag = false;
                    $scope.avgHospitalRateViewFlag = true;
                }
                $scope.AVGHospitalUsageRatesPerYearConfigChart.series[0].data = [];
                $scope.AVGHospitalUsageRatesPerYearConfigChart.series[0].tostartDateAVGHospital = '';
                $scope.AVGHospitalUsageRatesPerYearConfigChart.series[0].toendDateAVGHospital = '';

                angular.forEach(responseData, function (val, key) {
                    $scope.AVGHospitalUsageRatesPerYearConfigChart.series[0].tostartDateAVGHospital = $filter('date')(val.FromDate, "MM-dd-yyyy"); 
                    $scope.AVGHospitalUsageRatesPerYearConfigChart.series[0].toendDateAVGHospital = $filter('date')(val.ToDate, "MM-dd-yyyy"); 
                    $scope.AVGHospitalUsageRatesPerYearConfigChart.series[0].data.push([val.Per]);
                    $scope.AVGHospitalUsageRatesPerYearConfigChart.xAxis.categories.push(val.Type);
                     //$scope.AVGHospitalUsageRatesPerYearConfigChart.series[0].data.push({name: val.Type, y: parseFloat(val.Per)});
                });
                $scope.AVGHospitalUsageRatesPerYearConfigChart.loading = false;
            }).error(function (responseData, status, headers, config) {
                if (status == 401) {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
                } else {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
                }
                $rootScope.loaderShow = false;
            });
        }
        $scope.avgUsageByRate('');
    }]);

app.controller('inpatientAdmissions', ["$scope", "$http", "$rootScope","$filter", 
    function ($scope, $http, $rootScope,$filter) {
        $scope.maxDate = new Date ();
        $rootScope.loaderShow = true;
        $scope.userDetails = JSON.parse(localStorage.getItem('userDetails'));

        $scope.inpatientAdmissionsConfigChart = {
            options: {
                colors: ['#86b3f1', '#f8906c', '#959b9c', '#eae573'],
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
                    tostartDateinpatientAdmissions: '',
                    toendDateinpatientAdmissions : '',
                    name: 'Total Admissions',
                    data: [],
                    showInLegend : true
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

        $scope.inpatientAdmissions = function (startAdmissions,endAdmissions) {
            $scope.start = startAdmissions;
           $scope.end = endAdmissions;
             var start = ""; var end = "";
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
             if(start!=''){
                start = start + ' 00:00:00.000';
            }
            if(end!=''){
                end = end + ' 23:59:00.000';
            }
            $scope.inpatientAdmissionsConfigChart.loading = true;
            $scope.inpatientAdmissionsConfigChart.series[0].data = [];
            $scope.inpatientAdmissionsConfigChart.series[0].tostartDateinpatientAdmissions = '';
            $scope.inpatientAdmissionsConfigChart.series[0].toendDateinpatientAdmissions = '';
            var urlparams = '';
            if (startAdmissions != '' || endAdmissions != '') {
                //checkInput(start);
                urlparams = '?Fdate=' + start + '&TDate=' + end;
            }
            $http({
                method: 'GET',
                url: $rootScope.apiCallVar + 'common/data/KPIInpatientAdmissions' + urlparams,
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {
                $scope.inpatientAdmissionsViewFlag = false;
                $scope.inpatientAdmissionsFlag = true;
                if (responseData[0].Percentage == 0 || responseData[0].Percentage == null) {
                    $scope.inpatientAdmissionsFlag = false;
                    $scope.inpatientAdmissionsViewFlag = true;
                }
                angular.forEach(responseData, function (value, key) {
                    $scope.inpatientAdmissionsConfigChart.series[0].data.push([value.Code, value.Column1]);
                     $scope.inpatientAdmissionsConfigChart.series[0].tostartDateinpatientAdmissions = $filter('date')(value.FromDate, "MM-dd-yyyy"); 
                    $scope.inpatientAdmissionsConfigChart.series[0].toendDateinpatientAdmissions = $filter('date')(value.ToDate, "MM-dd-yyyy"); 
                });

                $scope.inpatientAdmissionsConfigChart.loading = false;
            }).error(function (responseData, status, headers, config) {
                if (status == 401) {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
                } else {
                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
                }
            });
        };

        $scope.inpatientAdmissions('');
    }]);