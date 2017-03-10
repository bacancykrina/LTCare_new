app.controller('patientDiagnosisCtrl', function ($scope, $location, $resource, $http, $rootScope, $routeParams, ngTableParams, $window) {
    $scope.DiagnosticICD = function (start, end, searchICD, selectedHCCFlag) {
        $scope.loader = true;
        $scope.selectedHCCFlag = selectedHCCFlag;
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
        var Api = $resource($rootScope.apiCallVar + 'common/data/GetPatientDiagnosisICD?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.ICD9TableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {
                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "DiagnosisDate_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'DiagnosisDate') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }
                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "SearchKeyword": searchICD,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end,
                    "filter1": selectedHCCFlag
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.ICDCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount);
                    if (searchICD == '' && start == '' && end == '' && selectedHCCFlag == 'Select HCC') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientICDDataFoundRoot = false;
                            $scope.noPatientICDDataFound = true;
                        } else {
                            $scope.noPatientICDDataFoundRoot = true;
                            $scope.PatientICDDataFound = true;
                            $scope.noPatientICDDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientICDDataFound = true;
                            $scope.PatientICDDataFound = false;
                        } else {
                            $scope.noPatientICDDataFound = false;
                            $scope.PatientICDDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }
    $scope.DiagnosticICD('', '', '', 'Select HCC');
})


