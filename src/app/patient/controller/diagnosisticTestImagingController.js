app.controller('diagnosisticTestImagingCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, $resource, ngTableParams) {
    $scope.DiagnosticTestsRad = function (start, end, searchpatientDiagnosticTestsImaging) {
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
        var Api = $resource($rootScope.apiCallVar + 'common/data/DiagnosticTestsRad?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.patientDiagnosticTestsImagingDatasTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "OrderDateTime_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'OrderDateTime') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }

                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "SearchKeyword": searchpatientDiagnosticTestsImaging,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.radCount = data.APICount[0].Column1;
                    params.total(data.APICount[0].Column1); // recal. page nav controls
//                        if (data.APICount[0].Column1 == 0) {
//                            $scope.noPatientDiagnosticTestsImagingDataFoundRoot = false;
//                        } else {
//                            $scope.noPatientDiagnosticTestsImagingDataFoundRoot = true;
//                        }
//
//                        if (data.APIData != "" || data.APIData.length > 0) {
//
//                            $scope.noPatientDiagnosticTestsImagingDataFound = false;
//                            $scope.PatientDiagnosticTestsImagingDataFound = true;
//                            return data.APIData;
//
//                        } else {
//                            $scope.noPatientDiagnosticTestsImagingDataFound = true;
//                            $scope.PatientDiagnosticTestsImagingDataFound = false;
//                        }
                    if (searchpatientDiagnosticTestsImaging == '' && start == '' && end == '') {
                        if (data.APICount[0].Column1 == 0) {
                            $scope.noPatientDiagnosticTestsImagingDataFoundRoot = false;
                            $scope.noPatientDiagnosticTestsImagingDataFound = true;
                        } else {
                            $scope.noPatientDiagnosticTestsImagingDataFoundRoot = true;
                            $scope.PatientDiagnosticTestsImagingDataFound = true;
                            $scope.noPatientDiagnosticTestsImagingDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].Column1 == 0) {
                            $scope.noPatientDiagnosticTestsImagingDataFound = true;
                            $scope.PatientDiagnosticTestsImagingDataFound = false;
                        } else {
                            $scope.noPatientDiagnosticTestsImagingDataFound = false;
                            $scope.PatientDiagnosticTestsImagingDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }
    $scope.DiagnosticTestsRad('', '', '');
})
